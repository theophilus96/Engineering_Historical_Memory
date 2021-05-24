import React from "react";
import "../css/oldHeader.css"

export default function OldNavBar() {
  const homeIcon = {
    padding: "5px 10px",
    height: 34,
    display: "block",
  };
  return (
    <div>
      <div class="header">
        <div class="topnav" id="myTopnav">
          <a
            href="https://engineeringhistoricalmemory.com/"
            id="homeIcon"
            style={homeIcon}
            class="header-left"
          >
            <img
              src="https://engineeringhistoricalmemory.com/Images/home-glami.png"
              style={{ height: 34 }}
            />
          </a>
          <a href="/" id="pageTitle" class="header-left"></a>
          <div class="dropdown header-right">
            <div class="dropbtn">
              <i class="fa fa-bars" aria-hidden="true"></i>
            </div>
            <div
              class="dropdown-content"
              style={{ position: "absolute", right: 0, width: 150 }}
            >
              <div class="dropdown1">
                <a class="dropbtn1">
                  Applications <i class="fa fa-caret-down"></i>
                </a>
                <div class="dropdown-content1" style={{ minWidth: 250 }}>
                  <div class="dropdown2">
                    <a
                      class="dropbtn2"
                      href="https://engineeringhistoricalmemory.com/Maps.php"
                    >
                      <img
                        src="https://engineeringhistoricalmemory.com/Images/apps/Afro-eurasia.png"
                        class="app-thumb"
                      />
                      Maps of Afro-Eurasia
                      <i class="fa fa-caret-down" />
                    </a>
                    <div class="dropdown-content2" style={{ minWidth: 250 }}>
                      <a
                        id="fm"
                        style={{ display: "block" }}
                        href="https://engineeringhistoricalmemory.com/FraMauro.php"
                      >
                        <img
                          src="https://engineeringhistoricalmemory.com/Images/apps/Fra Mauro.jpg"
                          class="app-thumb"
                        />
                        <span>
                          Fra Mauro’s Map of the World (dated 26 August 1460)
                        </span>
                      </a>
                      <a
                        id="gm"
                        style={{ display: "block" }}
                        href="https://engineeringhistoricalmemory.com/GenoeseMap.php"
                      >
                        <img
                          src="https://engineeringhistoricalmemory.com/Images/apps/Genoese Map.jpg"
                          class="app-thumb"
                        />
                        <span>Genoese Map of the World 1457 CE</span>
                      </a>
                      <a id="maokun" style={{ display: "none" }}></a>
                      <a id="gnd" style={{ display: "none" }}></a>
                      <a id="dm" style={{ display: "none" }}></a>
                      <a id="edr" style={{ display: "none" }}></a>
                    </div>
                  </div>
                  <div class="dropdown2">
                    <a
                      class="dropbtn2"
                      href="https://engineeringhistoricalmemory.com/Travels.php"
                    >
                      <img
                        src="https://engineeringhistoricalmemory.com/Images/apps/Travels.jpg"
                        class="app-thumb"
                      />
                      Travel Accounts
                      <i class="fa fa-caret-down" />
                    </a>
                    <div class="dropdown-content2" style={{ minWidth: 250 }}>
                      <a
                        id="mp"
                        style={{ display: "block" }}
                        href="https://engineeringhistoricalmemory.com/MarcoPolo.php"
                      >
                        <img
                          src="https://engineeringhistoricalmemory.com/Images/apps/Marco-polo.png"
                          class="app-thumb"
                        />
                        <span>Marco Polo. Le Devisement dou monde</span>
                      </a>
                      <a
                        id="ibn"
                        style={{ display: "block" }}
                        href="https://engineeringhistoricalmemory.com/IbnBattuta.php"
                      >
                        <img
                          src="https://engineeringhistoricalmemory.com/Images/apps/battuta.jpeg"
                          class="app-thumb"
                        />
                        <span>
                          Ibn Battuta. Riḥla / The Journey (1325 - 1354 CE)
                        </span>
                      </a>
                    </div>
                  </div>
                  <div class="dropdown2">
                    <a
                      class="dropbtn2"
                      href="https://engineeringhistoricalmemory.com/Chronicles.php"
                    >
                      <img
                        src="https://engineeringhistoricalmemory.com/Images/apps/Chronicles.jpg"
                        class="app-thumb"
                      />
                      Chronicles
                      <i class="fa fa-caret-down" />
                    </a>
                    <div class="dropdown-content2" style={{ minWidth: 250 }}>
                      <a
                        id="mc"
                        style={{ display: "block" }}
                        href="https://engineeringhistoricalmemory.com/MorosiniCodex.php"
                      >
                        <img
                          src="https://engineeringhistoricalmemory.com/Images/apps/morosini-codex.jpg"
                          class="app-thumb"
                        />
                        <span>The Morosini Codex (1095-1433)</span>
                      </a>
                      <a
                        id="msl"
                        style={{ display: "block" }}
                        href="https://engineeringhistoricalmemory.com/MingShilu.php"
                      >
                        <img
                          src="https://engineeringhistoricalmemory.com/Images/apps/ming-shilu.jpg"
                          class="app-thumb"
                        />
                        <span>
                          Southeast Asia in the Ming Shilu (明實錄, 1368-1644)
                        </span>
                      </a>
                      <a
                        id="russ"
                        style={{ display: "block" }}
                        href="https://engineeringhistoricalmemory.com/RussianTowns.php"
                      >
                        <img
                          src="https://engineeringhistoricalmemory.com/Images/apps/Old Russian Towns.jpg"
                          class="app-thumb"
                        />
                        <span>
                          The List of Old-Russian Towns (last quarter of the
                          14th - early 15th c.)
                        </span>
                      </a>
                      <a id="nov" style={{ display: "none" }}></a>
                      <a id="ago" style={{ display: "none" }}></a>
                      <a id="malay" style={{ display: "none" }}></a>
                      <a
                        id="ayu"
                        style={{ display: "block" }}
                        href="https://engineeringhistoricalmemory.com/Ayutthaya.php"
                      >
                        <img
                          src="https://engineeringhistoricalmemory.com/Images/apps/ayutthaya.jpg"
                          class="app-thumb"
                        />
                        <span>
                          The Royal Chronicles of Ayutthaya (Book One,
                          1169-1548)
                        </span>
                      </a>
                      <a id="pate" style={{ display: "none" }}></a>
                      <a id="ci" style={{ display: "none" }}></a>
                      <a id="hung" style={{ display: "none" }}></a>
                    </div>
                  </div>
                  <div class="dropdown2">
                    <a
                      class="dropbtn2"
                      href="https://engineeringhistoricalmemory.com/Manuscripts.php"
                    >
                      <img
                        src="https://engineeringhistoricalmemory.com/Images/apps/ST.png"
                        class="app-thumb"
                      />
                      Illuminated Codices
                      <i class="fa fa-caret-down" />
                    </a>
                    <div class="dropdown-content2" style={{ minWidth: 250 }}>
                      <a id="imola" style={{ display: "none" }}></a>
                      <a id="fgm" style={{ display: "none" }}></a>
                      <a id="bm" style={{ display: "none" }}></a>
                    </div>
                  </div>
                  <div class="dropdown2">
                    <a
                      class="dropbtn2"
                      href="https://engineeringhistoricalmemory.com/Sites.php"
                    >
                      <img
                        src="https://engineeringhistoricalmemory.com/Images/apps/Sites.jfif"
                        class="app-thumb"
                      />
                      Sites
                      <i class="fa fa-caret-down" />
                    </a>
                    <div class="dropdown-content2" style={{ minWidth: 250 }}>
                      <a
                        id="cm"
                        style={{ display: "block" }}
                        href="https://engineeringhistoricalmemory.com/MethoniCastle.php"
                      >
                        <img
                          src="https://engineeringhistoricalmemory.com/Images/apps/Modon.jpg"
                          class="app-thumb"
                        />
                        <span>
                          The Methoni Castle (1207-1500 &amp; 1685-1715)
                        </span>
                      </a>
                      <a
                        id="raj"
                        style={{ display: "block" }}
                        href="https://engineeringhistoricalmemory.com/Rajasthan.php"
                      >
                        <img
                          src="https://engineeringhistoricalmemory.com/Images/apps/rajasthan.png"
                          class="app-thumb"
                        />
                        <span>
                          Hill Forts of Rajasthan (ca 8th-16th cent. CE)
                        </span>
                      </a>
                    </div>
                  </div>
                  <div class="dropdown2">
                    <a
                      class="dropbtn2"
                      href="https://engineeringhistoricalmemory.com/Documents.php"
                    >
                      <img
                        src="https://engineeringhistoricalmemory.com/Images/apps/Archival docs.jpg"
                        class="app-thumb"
                      />
                      Archival Documents <i class="fa fa-caret-down" />
                    </a>
                    <div class="dropdown-content2" style={{ minWidth: 250 }}>
                      <a
                        id="sinai"
                        style={{ display: "block" }}
                        href="https://engineeringhistoricalmemory.com/MountSinai.php"
                      >
                        <img
                          src="https://engineeringhistoricalmemory.com/Images/apps/Mount Sinai.png"
                          class="app-thumb"
                        />
                        <span>
                          Pope Gregory X’s Privilege for the Holy Monastery of
                          St Catherine of Sinai (24 September 1274)
                        </span>
                      </a>
                      <a id="come" style={{ display: "none" }}></a>
                    </div>
                  </div>
                  <div class="dropdown2">
                    <a
                      class="dropbtn2"
                      href="https://engineeringhistoricalmemory.com/Paintings.php"
                    >
                      <img
                        src="https://engineeringhistoricalmemory.com/Images/apps/paintings.jpg"
                        class="app-thumb"
                      />
                      Paintings
                      <i class="fa fa-caret-down" />
                    </a>
                    <div class="dropdown-content2" style={{ minWidth: 250 }}>
                      <a
                        id="bosch"
                        style={{ display: "block" }}
                        href="https://engineeringhistoricalmemory.com/Bosch.php"
                      >
                        <img
                          src="https://engineeringhistoricalmemory.com/Images/apps/Bosch.jpg"
                          class="app-thumb"
                        />
                        <span>
                          The “Wayfarer Triptych” by Jheronimus Bosch (ca
                          1485-1500)
                        </span>
                      </a>
                    </div>
                  </div>
                  <div class="dropdown2">
                    <a
                      class="dropbtn2"
                      href="https://engineeringhistoricalmemory.com/Aggregators.php"
                    >
                      <img
                        src="https://engineeringhistoricalmemory.com/Images/apps/Aggregator.png"
                        class="app-thumb"
                      />
                      History+
                      <i class="fa fa-caret-down" />
                    </a>
                    <div class="dropdown-content2" style={{ minWidth: 250 }}>
                      <a
                        id="aem"
                        style={{ display: "block" }}
                        href="https://engineeringhistoricalmemory.com/AfroEurasiaMap.php"
                      >
                        <img
                          src="https://engineeringhistoricalmemory.com/Images/apps/Afro-eurasia.png"
                          class="app-thumb"
                        />
                        <span>Maps of Afro-Eurasia (1100-1460 CE)</span>
                      </a>
                      <a
                        id="ae"
                        style={{ display: "block" }}
                        href="https://engineeringhistoricalmemory.com/AfroEurasia.php"
                      >
                        <img
                          src="https://engineeringhistoricalmemory.com/Images/apps/advanced_search.png"
                          class="app-thumb"
                        />
                        <span>
                          Chronicles and Travel Accounts of Afro-Eurasia
                          (1205-1533 CE)
                        </span>
                      </a>
                      <a
                        id="vis"
                        style={{ display: "block" }}
                        href="https://engineeringhistoricalmemory.com/Visualisation.php"
                      >
                        <img
                          src="https://engineeringhistoricalmemory.com/Images/apps/Visualisation.png"
                          class="app-thumb"
                        />
                        <span>
                          Information Visualisation for Digital History
                        </span>
                      </a>
                      <a id="sr" style={{ display: "none" }}></a>
                    </div>
                  </div>{" "}
                </div>
              </div>

              <a
                class="header-right"
                href="https://engineeringhistoricalmemory.com/Collaborators.php"
              >
                Research Team
              </a>

              <div class="dropdown1">
                <a class="dropbtn1">
                  Info <i class="fa fa-caret-down"></i>
                </a>
                <div class="dropdown-content1" style={{ minWidth: 150 }}>
                  <a
                    class="header-right"
                    href="https://engineeringhistoricalmemory.com/About.php"
                  >
                    <i
                      class="fa fa-info-circle header-icon"
                      aria-hidden="true"
                    ></i>{" "}
                    About
                  </a>
                  <a
                    class="header-right"
                    href="https://engineeringhistoricalmemory.com/TermsOfUse.php"
                  >
                    <i class="fa fa-file header-icon"></i>
                    Terms of Use
                  </a>
                  <a
                    class="header-right"
                    href="https://engineeringhistoricalmemory.com/Credits.php"
                  >
                    <i class="fa fa-handshake-o header-icon"></i> Credits
                  </a>
                </div>
              </div>
              <a
                class="header-right"
                href="https://engineeringhistoricalmemory.com/ContactUs.php"
              >
                Contact Us
              </a>
            </div>
          </div>

          <a
            id="loginBtn"
            style={{ float: "right", padding: 12 }}
            href="https://engineeringhistoricalmemory.com/Login.php"
          >
            <i
              class="fa fa-sign-in"
              style={{ fontSize: 20 }}
              aria-hidden="true"
            ></i>
          </a>
        </div>
      </div>
    </div>
  );
}
