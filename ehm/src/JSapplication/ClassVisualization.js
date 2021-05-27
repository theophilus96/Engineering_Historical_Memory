import {FIELDS} from "./config.js";
import {postRequestForm} from "./httpRequest.js";
import {createBtnWithTooltip, SAVE_ICON, CLOSE_ICON} from "./createBtn.js";
import {MOUNT_SINAI_LAYERS} from "./MountSinaiVisLayers.js"

const PRELOAD_MAPS = ['sinai', 'bosch'];

export class Visualization {
    constructor(container, mapType, totalResults, clickAction, resetAction, boschKeywords) {
        this.container = container;
        this.mapType = mapType;
        this.totalResults = totalResults;
        this.boschKeywords = boschKeywords;
        const hist_map_fields = FIELDS[mapType];
        const cont_map_fields = FIELDS.osm;
        this.cont_country_field = cont_map_fields.cont_country;
        this.cont_place_name_field = cont_map_fields.cont_place_name;
        this.cont_id_field = cont_map_fields.cont_id;
        this.hist_id_field = hist_map_fields.hist_id || hist_map_fields.post_ids;
        this.hist_place_name_field = hist_map_fields.hist_place_name || hist_map_fields.post_titles;
        this.hist_cartouche_title_field = hist_map_fields.hist_cartouche_title;
        this.hist_layer_field = hist_map_fields.hist_layer;
        this.hist_x_field = hist_map_fields.hist_xzoom;
        this.hist_y_field = hist_map_fields.hist_yzoom;
        this.clickAction = clickAction;
        this.resetAction = resetAction;

        if (!(typeof this.hist_id_field === 'string' || this.hist_id_field instanceof String)) {
            this.hist_id_field = this.hist_id_field.fm;
            this.hist_place_name_field = this.hist_place_name_field.fm;
            this.hist_cartouche_title_field = this.hist_cartouche_title_field.fm;
            this.hist_x_field = this.hist_x_field.fm;
            this.hist_y_field = this.hist_y_field.fm;
        }
        this.visSelect = document.getElementById('visualizationSelect');
        this.init();
        this.createNotAvail();
        this.createResetBtn();
        this.createSaveBtn();
    }

    init() {
        var _thisRef = this;
        this.chart = echarts.init(document.getElementById(this.container));
        if (PRELOAD_MAPS.includes(this.mapType)) {
            this.mode = 'rad';
            this.loadRadialTree();
        } else {
            if (this.visSelect) this.visSelect.addEventListener('change', function () {
                _thisRef.closeNotAvail();
                _thisRef.mode = this.value;
                if (_thisRef.mode == 'rad') _thisRef.loadRadialTree();
                else if (_thisRef.mode == 'tmp') _thisRef.loadTreeMapping();
                else if (_thisRef.mode == 'fdg') _thisRef.loadDirectedGraph();
            });
        }

        this.chart.on("click", (node) => {
            if (this.mode == 'rad') {
                if (this.mapType === 'sinai') {
                    this.addRemoveSinaiNodes(node.data);
                    this.clickAction(node.data.hist_ids);
                } else if (this.mapType === 'bosch' && node.data.hasOwnProperty('keyword_id')) {
                    let keyword_item = this.addRemoveBoschNodes(this.data, node.data.keyword_id);
                    this.clickAction(keyword_item);
                } else if (this.visSelect && this.visSelect.value != 'rad') return;
                else if (node.data.hasOwnProperty('country_id')) {
                    let country_item = this.addRemoveContNodes(this.data, node.data.country_id);
                    this.clickAction(country_item);
                } else if (node.data.hasOwnProperty('cont_id')) {
                    let cont_item = this.addRemoveHistNodes(this.data, node.data.cont_id);
                    this.clickAction(cont_item);
                } else if (node.data.hasOwnProperty('hist_id')) this.clickAction(node.data);
                this.showGraph(this.data);
                this.closeNotAvail();
            } else if (this.mode == 'tmp') {
                if (this.visSelect.value != 'tmp') return;
                this.clickAction(node.data);
            } else if (this.mode == 'fdg') {
                if (this.visSelect.value != 'fdg') return;
                var thisNode = this.fullNodes.find(n => n.id === node.data.id);
                if (thisNode.showing) {
                    let children_ids = this.data.nodes.filter(n => n.source === node.data.id).map(n => n.id);
                    this.data.nodes = this.data.nodes.filter(n => n.source !== node.data.id && !children_ids.includes(n.source));
                    this.showGraph(this.data);
                    thisNode.showing = false;
                } else {
                    this.data.nodes = Array.from(new Set(this.data.nodes.concat(this.fullNodes.filter(n => n.source === node.data.id))));
                    this.showGraph(this.data);
                    thisNode.showing = true;
                }
                this.clickAction(node.data, this.fullNodes);
            }
            this.chosenName = node.name || "";
            this.saveBtn.style.display = 'block';
            this.resetBtn.style.display = 'block';
        });
    }

    popup(result) {
        if (!this.data && !result[this.hist_layer_field]) return;
        if (this.mode == 'rad' && this.data.children) this.data.children.forEach(country => delete country.children);
        else if (this.mode == 'fdg') this.data.nodes = this.data.nodes.filter(node => node.category < 2);

        if (this.mapType === 'sinai') {
            this.data = JSON.parse(JSON.stringify(MOUNT_SINAI_LAYERS));
            this.data.forEach(l => l.children.forEach(l1 => delete l1.children));
            if (result) this.addRemoveSinaiNodes({hist_ids: [result[this.hist_id_field]]});
        } else if (this.mapType === 'bosch') {
            var matchKeyword = this.boschKeywords.find(keyword => keyword.keyword === result.bosch_keyword);
            if (matchKeyword && result) this.addRemoveBoschNodes(this.data, matchKeyword.id);
        } else if (!result[this.cont_country_field]) this.openNotAvail();
        else {
            this.addRemoveContNodes(this.data, result[this.cont_country_field]);
            this.addRemoveHistNodes(this.data, result[this.cont_id_field]);
            this.closeNotAvail();
        }
        this.showGraph(this.data);
    }

    convertTreeData() {
        var countries_list = this.totalResults.map(r => r[this.cont_country_field]);
        countries_list = Array.from(new Set(countries_list)).sort().filter(c => c);
        countries_list = countries_list.map((c, index) => ({name: c, country_id: c, value: index}));
        return {name: "Country", children: countries_list};
    }

    loadSinaiData() {
        var layers = JSON.parse(JSON.stringify(MOUNT_SINAI_LAYERS));
        layers.forEach(l => l.children.forEach(l1 => delete l1.children));
        return layers;
    }

    loadBoschData() {
        var children = this.boschKeywords.map(keyword => {
            let results = this.totalResults.filter(result => result.bosch_keywords.split("|").includes(keyword.id));
            return {
                name: keyword.keyword,
                wikipedia: keyword.wikipedia,
                value: keyword.id,
                keyword_id: keyword.id,
                results: results
            }
        })
        return {name: "Symbology", children: children};
    }

    convertTreeMapData() {
        var countries = {};
        for (let i = 0; i < this.totalResults.length; i++) {
            let result = this.totalResults[i];
            let country = result[this.cont_country_field];
            let cont_place_name = result[this.cont_place_name_field];
            if (!(cont_place_name && country)) continue;

            let cont_id = result[this.cont_id_field];
            let hist_id_list = result[this.hist_id_field].split("|");
            let hist_place_name_list = (result[this.hist_cartouche_title_field] || result[this.hist_place_name_field]).split("|");
            for (let j = 0; j < hist_id_list.length; j++) {
                let hist_id = hist_id_list[j];
                let hist_place_name = hist_place_name_list[j];
                if (hist_place_name) hist_place_name = hist_place_name.replace(/<[^>]*>?/gm, '')
                var new_hist_item = {hist_id: hist_id, name: hist_place_name, result: result, value: i};
                var new_cont_item = {
                    cont_id: cont_id,
                    name: cont_place_name,
                    children: [new_hist_item]
                };
                if (countries.hasOwnProperty(country)) {
                    let cont_items = countries[country];
                    let cont_item_index = cont_items.findIndex(item => item.cont_id === cont_id);
                    if (cont_item_index >= 0) cont_items[cont_item_index]['children'].push(new_hist_item);
                    else cont_items.push(new_cont_item);
                } else countries[country] = [new_cont_item];
            }
        }
        const ordered_countries = {};
        Object.keys(countries).sort().forEach(function (key) {
            ordered_countries[key] = countries[key];
        });

        var countries_list = [];
        for (let country in ordered_countries) {
            let cont_items = ordered_countries[country];
            cont_items = cont_items.sort((a, b) => (a["name"] > b["name"] ? 1 : -1));
            countries_list.push({name: country, country_id: country, children: cont_items});
        }
        return {name: "Country", children: countries_list};
    }

    convertGraphData() {
        var nodes = {root: {id: 'root', name: 'Countries', symbolSize: 20, category: 0, x: 0, y: 0, count: 0}};
        var links = [];
        var categories = [{name: 'Countries'}, {name: 'Country'}, {name: 'Contemporary item'}, {name: 'Historical item'}];
        for (let i = 0; i < this.totalResults.length; i++) {
            let result = this.totalResults[i];
            let country = result[this.cont_country_field];
            let cont_place_name = result[this.cont_place_name_field];
            let cont_id = result[this.cont_id_field];
            let hist_id_list = result[this.hist_id_field].split("|");
            let hist_place_name_list = result[this.hist_cartouche_title_field] || result[this.hist_place_name_field] || 'Unknown';
            hist_place_name_list = hist_place_name_list.split("|");
            for (let j = 0; j < hist_id_list.length; j++) {
                let hist_id = hist_id_list[j];
                let hist_place_name = hist_place_name_list[j];
                let x = parseFloat(result[this.hist_x_field]) || parseFloat(result.cont_lng);
                let y = parseFloat(result[this.hist_y_field]) || parseFloat(result.cont_lat);
                if (!(cont_place_name && country && x && y)) continue;
                let country_id_graph = country;
                let cont_id_graph = cont_id + "cont";
                let hist_id_graph = hist_id + "hist";

                if (!nodes.hasOwnProperty(country_id_graph)) {
                    let country_node = {
                        id: country_id_graph,
                        country_id: country,
                        name: country,
                        category: 1,
                        symbolSize: 15,
                        x: x,
                        y: y,
                        count: 1,
                        itemStyle: null,
                        label: {show: true},
                    };
                    let root_coun_link = {id: i + 'rootcoun', source: 'root', target: country_id_graph};
                    nodes[country_id_graph] = country_node;
                    links.push(root_coun_link);
                } else {
                    let node_x = nodes[country_id_graph].x,
                        node_y = nodes[country_id_graph].y,
                        count = nodes[country_id_graph].count;
                    nodes[country_id_graph].x = (node_x * count + x) / (count + 1);
                    nodes[country_id_graph].y = (node_y * count + y) / (count + 1);
                    nodes[country_id_graph].count += 1;
                }

                if (!nodes.hasOwnProperty(cont_id_graph)) {
                    let cont_node = {
                        id: cont_id_graph,
                        cont_id: cont_id,
                        name: cont_place_name,
                        category: 2,
                        symbolSize: 10,
                        x: x,
                        y: y,
                        count: 1,
                        source: country_id_graph,
                        label: {show: true},
                    };
                    let coun_cont_link = {id: i + 'councont', source: country_id_graph, target: cont_id_graph};
                    nodes[cont_id_graph] = cont_node;
                    links.push(coun_cont_link)
                } else {
                    let node_x = nodes[cont_id_graph].x,
                        node_y = nodes[cont_id_graph].y,
                        count = nodes[cont_id_graph].count;
                    nodes[cont_id_graph].x = (node_x * count + x) / (count + 1);
                    nodes[cont_id_graph].y = (node_y * count + y) / (count + 1);
                    nodes[cont_id_graph].count += 1;
                }

                let hist_node = {
                    id: hist_id_graph,
                    hist_id: hist_id,
                    name: hist_place_name,
                    value: hist_place_name,
                    category: 3,
                    symbolSize: 5,
                    x: x,
                    y: y,
                    source: cont_id_graph,
                    label: {show: true},
                    result: result,
                };
                let cont_hist_link = {id: i + 'conthist', source: cont_id_graph, target: hist_id_graph};
                nodes[hist_id_graph] = hist_node;
                links.push(cont_hist_link);

                let count = nodes.root.count;
                nodes.root.x = (nodes.root.x * count + x) / (count + 1);
                nodes.root.y = (nodes.root.y * count + y) / (count + 1);
                nodes.root.count += 1;
            }

        }
        nodes = Object.values(nodes);
        nodes.forEach(node => {
            node.x += (3 - node.category) * 100;
            node.y += (3 - node.category) * 100;
        })
        return {nodes: nodes, links: links, categories: categories};
    }

    convertSankeyData() {
        var nodes = [], links = [];
        for (let i = 0; i < this.totalResults.length; i++) {
            let result = this.totalResults[i];
            let country = result[this.cont_country_field];
            let cont_place_name = result[this.cont_place_name_field];

            // let cont_id = result[this.cont_id_field];
            // let hist_id_list = result[this.hist_id_field].split("|");
            let hist_place_name_list = (result[this.hist_cartouche_title_field] || result[this.hist_place_name_field]).split("|");

            if (country) nodes.push(country);
            if (cont_place_name) nodes.push(cont_place_name);
            hist_place_name_list.forEach(hist_place_name => {
                if (hist_place_name) nodes.push(hist_place_name)
            });

            if (country !== cont_place_name && country && cont_place_name) links.push({
                source: country,
                target: cont_place_name,
                value: 1
            });
            hist_place_name_list.forEach(hist_place_name => {
                if (hist_place_name !== cont_place_name && hist_place_name && cont_place_name) links.push({
                    source: cont_place_name,
                    target: hist_place_name,
                    value: 1
                })
            })

        }
        nodes = [...new Set(nodes)];
        nodes = nodes.map(node => ({name: node}));
        return {nodes: nodes, links: links};
    }

    addRemoveContNodes(data, country_id) {
        var _thisRef = this;
        if (this.mode == 'rad') {
            let country_item = data.children.find(c => c.country_id === country_id);
            if (country_item.hasOwnProperty('children')) delete country_item.children;
            else {
                let results = _thisRef.totalResults.filter(r => r[_thisRef.cont_country_field] === country_id);
                results = results.filter((item, index, array) => array.findIndex(t => t[_thisRef.cont_id_field] === item[_thisRef.cont_id_field]) === index);
                country_item.children = [];
                results.forEach(result =>
                    country_item.children.push({
                            cont_id: result[_thisRef.cont_id_field],
                            name: result[_thisRef.cont_place_name_field],
                        }
                    )
                )
            }
            return country_item;
        } else if (this.mode == 'fdg') {
            data.nodes = Array.from(new Set(data.nodes.concat(this.fullNodes.filter(n => n.source === country_id))));
        }

    }

    addRemoveHistNodes(data, cont_id) {
        var _thisRef = this;
        if (this.mode == 'rad') {
            let cont_item;
            for (let i = 0; i < data.children.length; i++) {
                let country_item = data.children[i];
                if (!country_item.hasOwnProperty('children')) continue;
                cont_item = country_item.children.find(c => c[_thisRef.cont_id_field] === cont_id);
                if (cont_item) break;
            }
            if (cont_item.hasOwnProperty('children')) delete cont_item.children;
            else {
                let results = _thisRef.totalResults.filter(r => r[_thisRef.cont_id_field] === cont_id);
                results = results.filter((item, index) => results.indexOf(item) >= index);
                cont_item.children = [];
                results.forEach(result => {
                        let hist_id_list = result[_thisRef.hist_id_field].split("|");
                        let hist_place_name_list = result[_thisRef.hist_place_name_field].split("|");
                        hist_id_list.forEach((hist_id, index) => {
                            cont_item.children.push({
                                hist_id: hist_id,
                                name: hist_place_name_list[index].replace(/<[^>]*>?/gm, ''),
                                result: result,
                                value: hist_id
                            })
                        });
                    }
                )
            }
            return cont_item;
        } else if (this.mode == 'fdg') {
            data.nodes = Array.from(new Set(data.nodes.concat(this.fullNodes.filter(n => n.source === cont_id + "cont"))));
        }
    }


    addRemoveSinaiNodes(node_data) {
        function compareSinaiObj(obj1, obj2) {
            var check = JSON.stringify(obj1.hist_ids) === JSON.stringify(obj2.hist_ids);
            if (obj1.hasOwnProperty('name') && obj2.hasOwnProperty('name')) check = check && obj1.name === obj2.name;
            return check;
        }

        function removeChildren(children) {
            children = JSON.parse(JSON.stringify(children));
            children.forEach(c => delete c.children)
            return children;
        }

        function addLayerToData(path) {
            var current = _thisRef.data[path[0]];
            var total = MOUNT_SINAI_LAYERS[path[0]];
            path.forEach((p, i) => {
                if (i) {
                    if (!current.children) current.children = removeChildren(total.children);
                    total = total.children[p];
                    current = current.children[p];
                }
            })
            if(total) current.children = removeChildren(total.children);
        }

        function removeLayerfromData(path) {
            var current = _thisRef.data[path[0]];
            path.forEach((p, i) => {
                if (i) current = current.children[p]
            });
            delete current.children;
        }

        var _thisRef = this;
        var path = [];
        MOUNT_SINAI_LAYERS.forEach((l, i) => l.children.forEach((l1, i1) => {
            if (compareSinaiObj(l1, node_data)) path = [i, i1];
            else l1.children.forEach((l2, i2) => {
                if (compareSinaiObj(l2, node_data)) path = [i, i1, i2];
                else l2.children.forEach((l3, i3) => {
                    if (compareSinaiObj(l3, node_data)) path = [i, i1, i2, i3];
                    else l3.children.forEach((l4, i4) => {
                        if (compareSinaiObj(l4, node_data)) path = [i, i1, i2, i3, i4];
                        else l4.children.forEach((l5, i5) => {
                            if (compareSinaiObj(l5, node_data)) path = [i, i1, i2, i3, i4, i5];
                            l5.children.forEach((l6, i6) => {
                                if (compareSinaiObj(l6, node_data)) path = [i, i1, i2, i3, i4, i5, i6];
                            })
                        })
                    })
                })
            })
        }))
        if (node_data.hasOwnProperty('children')) removeLayerfromData(path);
        else addLayerToData(path);
    }

    addRemoveBoschNodes(data, keyword_id) {
        if (this.mode == 'rad') {
            let keyword_item = data.children.find(c => c.keyword_id === keyword_id);
            if (keyword_item.hasOwnProperty('children')) delete keyword_item.children;
            else {
                let results = this.totalResults.filter(r => r.bosch_keywords.split("|").includes(keyword_id));
                keyword_item.children = [];
                results.forEach(result =>
                    keyword_item.children.push({
                            hist_id: result[this.hist_id_field],
                            name: result[this.hist_place_name_field],
                            result: result,
                        }
                    )
                )
            }
            return keyword_item;
        } else if (this.mode == 'fdg') {
            data.nodes = Array.from(new Set(data.nodes.concat(this.fullNodes.filter(n => n.source === country_id))));
        }
    }

    loadRadialTree() {
        if (this.mapType === 'sinai') this.data = this.loadSinaiData();
        else if (this.mapType === 'bosch') this.data = this.loadBoschData();
        else this.data = this.convertTreeData();
        this.showGraph(this.data);
    }

    loadTreeMapping() {
        this.data = this.convertTreeMapData();
        this.showGraph(this.data);
    }

    loadDirectedGraph() {
        this.data = this.convertGraphData();
        var fullNodes = this.data.nodes;
        this.fullNodes = fullNodes;
        this.data.nodes = fullNodes.filter(node => node.category < 2);
        this.showGraph(this.data);
    }

    loadSankey() {
        this.data = this.convertSankeyData();
        this.showGraph(this.data);
    }

    showGraph(data) {
        function createSinaiSerie(data) {
            return data.map((d, i) => ({
                type: 'tree',
                data: [d],
                roam: true,
                initialTreeDepth: 10,
                symbolSize: 7,
                top: i === 0 ? '-10%' : i === 1 ? '80%' : '100%',
                left: '20%',
                right: '20%',
                label: {
                    position: 'left',
                    verticalAlign: 'middle',
                    align: 'right',
                    fontSize: 12
                },
                leaves: {
                    label: {
                        position: 'right',
                        verticalAlign: 'middle',
                        align: 'left'
                    }
                },
                expandAndCollapse: true,
                animationDuration: 550,
                animationDurationUpdate: 750,
            }))
        }

        if (this.mapType === 'sinai') {
            this.chart.setOption({
                tooltip: {trigger: 'item', triggerOn: 'mousemove'},
                series: createSinaiSerie(data),
            });
        } else if (this.mode == 'rad') {
            this.chart.setOption({
                tooltip: {trigger: 'item', triggerOn: 'mousemove'},
                series: [
                    {
                        type: 'tree',
                        data: [data],
                        top: '20%',
                        bottom: '20%',
                        layout: 'radial',
                        symbol: 'emptyCircle',
                        symbolSize: 7,
                        animationDurationUpdate: 750,
                        initialTreeDepth: 10,
                        animationThreshold: 4000,
                        roam: true,
                        lineStyle: {width: 1},
                    }
                ]
            });
        } else if (this.mode == 'tmp') {
            this.chart.setOption({
                tooltip: {},
                series: [{
                    name: 'Countries',
                    type: 'treemap',
                    visibleMin: 300,
                    data: data.children,
                    leafDepth: 2,
                    label: {show: true, formatter: '{b}'},
                    upperLabel: {show: true, height: 30},
                    itemStyle: {borderColor: '#fff'},
                    levels: [
                        {itemStyle: {borderColor: '#555', borderWidth: 4, gapWidth: 4}},
                        {
                            colorSaturation: [0.3, 0.6],
                            itemStyle: {borderColorSaturation: 0.7, gapWidth: 2, borderWidth: 2}
                        },
                        {
                            colorSaturation: [0.3, 0.5],
                            itemStyle: {borderColorSaturation: 0.6, gapWidth: 1}
                        },
                        {colorSaturation: [0.3, 0.5]}
                    ]
                }]
            });
        } else if (this.mode == 'fdg') {
            this.chart.setOption({
                tooltip: {},
                animationDuration: 1500,
                animationEasingUpdate: "quinticInOut",
                series: [
                    {
                        type: "graph",
                        data: data.nodes,
                        links: data.links,
                        categories: data.categories,
                        layout: "none",
                        roam: true,
                        // focusNodeAdjacency: true,
                        itemStyle: {
                            normal: {
                                borderColor: "#fff",
                                borderWidth: 1,
                                shadowBlur: 10,
                                shadowColor: "rgba(0, 0, 0, 0.3)"
                            }
                        },
                        label: {
                            position: "right",
                            formatter: "{b}"
                        },
                        lineStyle: {
                            color: "source",
                            curveness: 0.3
                        },
                        emphasis: {
                            lineStyle: {
                                width: 10
                            }
                        }
                    }
                ]
            });
        } else if (this.mode == 'sankey') {
            this.chart.setOption({
                series: {
                    type: 'sankey',
                    layout: 'none',
                    emphasis: {
                        focus: 'adjacency'
                    },
                    data: data.nodes,
                    links: data.links,
                }
            })
        }
    }

    createNotAvail() {
        this.notAvailBtn = document.createElement('div');
        this.notAvailBtn.className = 'vis-not-avail';
        this.notAvailBtn.innerHTML = 'Not available!';
        this.notAvailBtn.style.display = 'none';
        document.getElementById(this.container).appendChild(this.notAvailBtn);
    }

    openNotAvail() {
        this.notAvailBtn.style.display = "block";
    }

    closeNotAvail() {
        this.notAvailBtn.style.display = "none";
    }

    createResetBtn() {
        var [button, tooltip, container] = createBtnWithTooltip(CLOSE_ICON, 'Delete selection');
        this.resetBtn = container;
        this.resetBtn.style.display = 'none';
        container.className += ' reset-btn';
        document.getElementById(this.container).appendChild(this.resetBtn);
        this.resetBtn.onclick = () => {
            this.closeNotAvail();
            if (this.mode == 'rad') this.loadRadialTree();
            else if (this.mode == 'tmp') this.loadTreeMapping();
            else if (this.mode == 'fdg') this.loadDirectedGraph();
            this.resetBtn.style.display = 'none';
            this.saveBtn.style.display = 'none';
            this.resetAction();
        }
    }

    createSaveBtn() {
        var [button, tooltip, container] = createBtnWithTooltip(SAVE_ICON, 'Save to Notebook');
        this.saveBtn = container;
        container.className += ' save-btn';
        container.style.display = 'none';
        document.getElementById(this.container).appendChild(container);

        button.onclick = () => {
            const currentUrl = window.location.pathname.split("/").pop() + window.location.search;
            postRequestForm("controller/saveSearch.php", {}, {
                title: this.chosenName,
                url: currentUrl,
                map: this.mapType
            }, response => {
                tooltip.innerText = response;
                setTimeout(() => {
                    tooltip.innerText = 'Save to Notebook'
                }, 3000);
            })
        }
    }
}