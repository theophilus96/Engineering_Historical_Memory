import React from "react";

export default function About() {
  return (
    <section className="pt-8 pt-md-11 pb-8 pb-md-14">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-md">
            <h1 className="display-4 mb-2">About</h1>

            <p className="fs-lg text-gray-700 mb-md-0">Updated 31/5/2021</p>
          </div>
          <div className="col-auto">
            <a
              href="#!"
              className="btn btn-primary-soft"
              onClick={() => {
                navigator.clipboard.writeText(
                  "Nanetti, A. About Engineering Historical Memory. Retrieved from https://engineeringhistoricalmemory.com/About.php (accessed on 2021-7-12)"
                );
              }}
            >
              Cite
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <hr className="my-6 my-md-8" />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-8">
            <p className="fs-lg text-gray-800 mb-6 mb-md-8">
              Dr Andrea Nanetti first theorised Engineering Historical Memory
              (EHM) when he was Visiting Scholar at Princeton University in
              2007. Since then, EHM is an ongoing research project that welcomes
              international and multidisciplinary collaboration to design and
              test interactive applications for virtual (re)organisation and
              delivery of historical knowledge in the digital age. The aim is to
              overcome linguistic obstacles and cultural barriers of historical
              research in a transcultural (re)reading of primary sources and
              secondary literature for the pre-modern history of the
              Afro-Eurasian continent, its people and their interactions between
              1205 and 1533. The stage being the intercontinental communication
              networks by sea and by land as they were first identified by the
              German geographer Ferdinand Freiherr von Richthofen (1833-1905) in
              his magnum opus China (1877-1912). With equally and fairly
              engagement of different cultural environments in Europe, Africa,
              and Asia, this scholarly initiative also aims to contribute to the
              forging of international, intercultural, and interreligious
              dialogue and cooperation.
            </p>
          </div>
          <div className="col-12 col-md-4">
            <div className="card shadow-light-lg">
              <div className="card-body">
                <h4>Dr Andrea Nanetti </h4>

                <div className="avatar avatar-xxl mt-2 mb-2">
                  <img
                    src="https://media-exp3.licdn.com/dms/image/C5103AQEQ7eYMFgJXBQ/profile-displayphoto-shrink_200_200/0/1578821974147?e=1629331200&v=beta&t=Z_g1bhzHqGcKgEGXAT_6qoUCw-3V3oye0IXLSHuivQA"
                    alt="..."
                    className="avatar-img rounded-circle"
                  />
                </div>

                <p className="fs-sm text-gray-800 mb-5">
                  Engineering Historical Memory, Founding Director of LIBER Lab
                </p>

                <h6 className="fw-bold text-uppercase text-gray-700 mb-2">
                  Phone
                </h6>

                <p className="fs-sm mb-5">
                  <a href="tel:555-123-4567" className="text-reset">
                    (+65) 6513-8250
                  </a>
                </p>

                <h6 className="fw-bold text-uppercase text-gray-700 mb-2">
                  Email
                </h6>

                <p className="fs-sm mb-0">
                  <a href="mailto:support@goodthemes.co" className="text-reset">
                    andrea.nanetti@ntu.edu.sg
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <p className="fs-lg text-gray-800 mb-6 mb-md-8">
            Since 2007, EHM is studying and practising "by what means"
            traditional historical scholarship can supply machine-readable
            information sets to empower historical sciences with artificial
            intelligence and machine learning, thus enabling all users to read
            primary historical sources according to different levels of
            knowledge and expertise interactively. In the history domain, EHM
            makes a cross-disciplinary use of established research processes,
            such as mapping as understood in mathematics and linguistics (i.e.,
            an operation that associates each element of a given set, the
            domain, with one or more items of a second set, the range) and
            parsing as understood in computing (i.e., analyse narratives into
            logical syntactic components) to kick-off the exploration of primary
            historical sources. Using these operations of mapping and parsing
            for individual primary historical sources, EHM associates each
            element of given sets of information provided by the domain of the
            traditional disciplines (e.g., history, art history, philology,
            palaeography, diplomatics, codicology, archaeology, epigraphy,
            sigillography) with one or more elements of the range of
            machine-readable content management systems (e.g., spreadsheets,
            computational notebooks). The level of accuracy of this preliminary
            human activity is directly proportional to that of the aggregations
            generated and visualised by the EHM algorithms from different sets
            of similar written or depicted elements in the EHM database (e.g.,
            geographical names, people’s names, goods, ships, governments,
            events, architectures, drawings) and from potentially relevant
            publications, images, videos, and news retrieved in online
            repositories.
          </p>

          <p className="fs-lg text-gray-800 mb-9 mb-md-11">
            To understand and emphasise the unity of EHM as an interactive
            system in the approach to historical information, the rhetorical and
            conceptual linking of “mapping and visualisation” as well as “search
            and visualisation” should be hendiadys. Thus, the term “mapping” is
            understood, in its basic meaning, as the localization and
            description of elements, facts or phenomena that relate to a
            circumscribed area, historically understood at the intersection of
            precise space and time coordinates. The aim is to provide and test
            an example of an innovative epistemological process to visually
            distil historical data. The “visualization” process is seen not as a
            reductive representation to epitomise and/or illustrate written
            narratives, but as an investigative tool that the historian
            (especially one who intends to enter fully into the digital era) can
            use for discovering and organising new relationships between
            objects, in a new historical landscape where past, present, and
            future can merge in a democratised whole (Altman, 2008; Bolick,
            2006).
          </p>

          <p className="fs-lg text-gray-800 mb-5">
            The EHM approach to history can be construed as a hybrid
            human-machine methodology because it relies on both human scholarly
            touch and machine computational power. The attributes of the EHM
            methodology (i.e., set of methods) can be named as follows.
          </p>

          <div className="d-flex">
            <span className="badge badge-rounded-circle bg-success-soft mt-1 me-4">
              <i className="fe fe-check"></i>
            </span>

            <p className="text-gray-800">
              Analytic, because of the scholarly mapping and parsing of
              information from primary historical sources.
            </p>
          </div>
          <div className="d-flex">
            <span className="badge badge-rounded-circle bg-success-soft mt-1 me-4">
              <i className="fe fe-check"></i>
            </span>

            <p className="text-gray-800">
              Synthetic, in reason of the interactive visualisation of selected
              information.
            </p>
          </div>
          <div className="d-flex">
            <span className="badge badge-rounded-circle bg-success-soft mt-1 me-4">
              <i className="fe fe-check"></i>
            </span>

            <p className="text-gray-800">
              Exploratory, because of the automatic search for online
              publications, images, videos, and news potentially relevant to the
              user’s choices.
            </p>
          </div>
          <div className="d-flex">
            <span className="badge badge-rounded-circle bg-success-soft mt-1 me-4">
              <i className="fe fe-check"></i>
            </span>

            <p className="text-gray-800">
              Aggregative, as far as it allows interactive selections and
              visualisations of different sets of search results.
            </p>
          </div>
          <div className="d-flex mb-5">
            <span className="badge badge-rounded-circle bg-success-soft mt-1 me-4">
              <i className="fe fe-check"></i>
            </span>

            <p className="text-gray-800 mb-9 mb-md-11">
              Non-narrative in principle, because the organisation of the
              materials into narratives is up to the user who generates gamut
              accordingly.
            </p>
          </div>
          <div className="row">
            <p className="fs-lg text-gray-800 mb-6 mb-md-8">
              To understand and emphasise the unity of EHM as an interactive
              system in the approach to historical information, the rhetorical
              and conceptual linking of “mapping and visualisation” as well as
              “search and visualisation” should be hendiadys. Thus, the term
              “mapping” is understood, in its basic meaning, as the localization
              and description of elements, facts or phenomena that relate to a
              circumscribed area, historically understood at the intersection of
              precise space and time coordinates. The aim is to provide and test
              an example of an innovative epistemological process to visually
              distil historical data. The “visualization” process is seen not as
              a reductive representation to epitomise and/or illustrate written
              narratives, but as an investigative tool that the historian
              (especially one who intends to enter fully into the digital era)
              can use for discovering and organising new relationships between
              objects, in a new historical landscape where past, present, and
              future can merge in a democratised whole (Altman, 2008; Bolick,
              2006).
            </p>

            <p className="fs-lg text-gray-800 mb-6 mb-md-8">
              This "mapping and visualization" method is intended to be the
              first step towards experimentation with less narrative (if not
              non-narrative) ways to make history in the digital era. It does
              not reflect a positivistic revival; rather, it is a consequence of
              the belief that «narrative is not just a set of materials, but it
              is a quite specific method of organizing those materials» (Altman,
              2008, 5). Here, Altman rephrased a definition given at the height
              of structuralist activity by Karlheinz Stierle (1972, 178), who
              referred to the "basic structure of all narrative texts" as
              formulated by Arthur Coleman Danto (1965): <br />
              x is f at t1
              <br />
              g happens to x at t2
              <br />
              x is h at t3
              <br />
              The famous statement by the Italian theorist and philosopher
              Benedetto Croce can also be cited in this context: «Where there is
              no narrative, there is no history» (Croce, 1951, 26).
            </p>

            <p className="fs-lg text-gray-800 mb-6 mb-md-8">
              In fact, as Altman also highlighted in the first pages of his book
              (Altman, 2008, 1-3), few human endeavours are more widespread or
              more generally endowed with cultural importance than narrative.
              Stories are the major vehicles of personal memory, a mainstay of
              law, entertainment, and history (Altman, 2008, 1). Historically,
              definitions of narrative have been tied tightly to a particular
              type of plot. This tendency began with Aristotle (Poetics, Book
              VI; ed. 1909, 13), who informed us that a tragedy is impossible
              without action, but may exist without characters (Altman, 2008,
              2). Adopted from Aristotle, the notion of the unity of action
              involves the need to build a play around a single, unbroken plot
              thread, eschewing competing storylines, unnecessary characters,
              and unrelated episodes. Stories must be coherent; they must have a
              distinct beginning, middle, and end; they must connect their parts
              through clearly motivated causes; and they must expunge any
              material unrelated to this unity of action (Altman, 2008, 3).
              Altman notes, towards the end of his work, that «We circulate
              among characters and places, not according to our own interests
              but according to an itinerary fixed by the narrator». If it is
              inaugurated by the process of "following," the act of reading also
              involves a tendency toward "mapping": calling on our memory of the
              text at hand, as well as on our prior experience of other texts,
              the process of mapping involves the reader in a perpetual return
              to the past, and in a constant attempt to define the present in
              terms of that past, permitting an eventual understanding of the
              present (Altman, 2008, 291-292).
            </p>
            <p className="fs-lg text-gray-800 mb-6 mb-md-8">
              Dr Winnie Cui (Outreach Director at Microsoft) reviewed EHM on the
              Microsoft Research Blog "because of its unique and successful
              interdisciplinary collaboration". PLOS ONE also showcased EHM for
              its open-society and non-commercial perspective. For a brief
              overview of the research project, one can refer to the article
              published by Nicola Wittekindt (Science Writer and Editor) on NTU
              Singapore Pushing Frontiers Magazine.
            </p>

            <p className="fs-lg text-gray-800 mb-6 mb-md-8">
              Currently, Dr Nanetti runs EHM in the framework of LIBER
              (Laboratory of Interdisciplinary Bookish and Experiential
              Research), which he established at the School of Art, Design and
              Media of Nanyang Technological University Singapore (NTU-ADM) in
              January 2019, and since then he is its Director. At NTU Singapore
              the laboratory is run in collaboration with the School of Physical
              and Mathematical Sciences (NTU-SPMS), the School of Computer
              Science and Engineering (NTU-SCSE), and the Office of Information
              Knowledge and Library Services (OIKLS). The research focus is on
              visualisation tools (technologies and processes) that can be
              readily adopted by all users to research high volumes of data
              through maps, timelines, tag clouds, and interconnected graphs on
              different scales. The results are solutions to facilitate the
              transition from top-down approaches (based on the application of
              theories) to agent-based modelling and simulations, directly
              related to the knowledge of primary sources (established by
              philological research) and the constant flow of secondary
              literature (updating and discussing historical interpretations).
              In practice, this approach empowers scholars with more quickly and
              more thoroughly explorations of previously accumulated knowledge
              of places, people, things, and events in the historical landscape
              of different cultures in various languages.
            </p>

            <p className="fs-lg text-gray-800 mb-2 mb-md-4">
              Target audience with interests in how computers can enhance the
              transcultural understanding of primary historical sources for the
              study of Afro-Eurasia
            </p>
            <div className="d-flex">
              <ul className="mb-0">
                <li className="text-gray-800">
                  Historians (professionals/paid, amateurs/unpaid)
                </li>
                <li className="text-gray-800 mt-4">
                  Digital born generation of students
                </li>
                <li className="text-gray-800 mt-4">History teachers</li>
                <li className="text-gray-800 mt-4">Librarians</li>
                <li className="text-gray-800 mt-4">Archivists</li>
                <li className="text-gray-800 mt-4">Museum curators</li>
                <li className="text-gray-800 mt-4 mb-6 mb-md-8">
                  General public
                </li>
              </ul>
            </div>

            <p className="fs-lg text-gray-800 mb-2 mb-md-4">
              Plan of action: crucial primary sources for the study of
              Afro-Eurasia between 1205 and 1533:
            </p>
            <div className="d-flex">
              <ul className="mb-0">
                <li className="text-gray-800">
                  World maps (e.g., Fra Mauro, Genoese world maps)
                </li>
                <li className="text-gray-800 mt-4">
                  Travel account (e.g., Marco Polo, Ibn Battuta, Zheng He)
                </li>
                <li className="text-gray-800 mt-4">
                  Chronicles (e.g., Venetian diaries, Ming Shi-Lu, Malay annals)
                </li>
                <li className="text-gray-800 mt-4">
                  City maps (Map of Imola, the earliest extant modern survey of
                  a city)
                </li>
                <li className="text-gray-800 mt-4">
                  Archival documents (e.g., Gregory X, Modon and Coron)
                </li>
                <li className="text-gray-800 mt-4 mb-6 mb-md-8">
                  Archaeological sites (e.g., Castle of Modon, Rock Inscriptions
                  of Mariners)
                </li>
              </ul>
            </div>

            <h3 className="mb-5">Methodological foci</h3>
            <div className="d-flex">
              <ol className="mb-0">
                <li className="text-gray-800">
                  Philological accuracy
                  <br />
                  Goal: correctly transfer into digital database information
                  already published, without diluting its philological accuracy
                  Plan of action: collaboration with authors and publishers of
                  critical editions and translations to access the most accurate
                  scholarship available on crucial primary historical sources{" "}
                </li>
                <li className="text-gray-800 mt-4">
                  Open access
                  <br />
                  Goal: make freely available to the public crucial copyright
                  materials Plan of action: collaboration with libraries,
                  archives, museums, and publishers{" "}
                </li>
                <li className="text-gray-800 mt-4">
                  Machine-readable information
                  <br />
                  Goal: generate (semi)automatic aggregations of historical
                  knowledge Plan of action: map historical information
                  (unstructured) into curated relational databases (phase 1)
                  that can empower graph databases (phase 2){" "}
                </li>
                <li className="text-gray-800 mt-4">
                  Interactivity
                  <br />
                  Goal: connect the information embedded in different historical
                  primary sources Plan of action: design and develop ABMS and
                  visualisation tools to facilitate the flow of information
                  linked by keywords and generate an augmented exploration of
                  primary historical sources
                </li>
                <li className="text-gray-800 mt-4">
                  Link to relevant secondary literature
                  <br />
                  Goal: connect the information selected by the user to relevant
                  secondary literature available online Plan of action: meta
                  search on leading online repositories (e.g., Europeana,
                  Taylor&Francis, Elsevier, CNKI, Wanfang), resources mashup,
                  critical filtering Expected outcome: transparent references to
                  crucial historical sources and their related scholarship
                  available online{" "}
                </li>
                <li className="text-gray-800 mt-4">
                  Provenance and validation
                  <br />
                  Goal: provide a clear understanding of the information’s
                  provenance and a robust validation method to assess its
                  accuracy Plan of action: link information from secondary
                  literature to the primary source on which it is grounded
                </li>
                <li className="text-gray-800 mt-4 mb-6 mb-md-8">
                  Public participation (i.e., citizen science, crowd-sourced
                  science)
                  <br />
                  Goal: generate volunteer monitoring on the information
                  published on EHM Plan of action: create a community to
                  constantly update the information available on the EHM
                  database (curated by professionals), and connect the
                  information published on EHM to the relevant Wikipedia pages
                  (curated by a larger pool of scholars and amateurs)
                </li>
              </ol>
            </div>
            <h3 className="mb-5">Spaces of fruition</h3>
            <p className="fs-lg text-gray-800 mb-5">
              EHM aims to contribute to the reinvention of the user experience
              in historical spaces such as libraries, archives, museums, and
              archaeological sites.
            </p>
            <div className="d-flex">
              <ul className="mb-0">
                <li className="text-gray-800">
                  Digital spaces: desktop and mobile devices, projection
                  mapping, large screens, AR and VR
                </li>
                <li className="text-gray-800 mt-4">
                  Historical spaces: libraries, archives, and museums that hold
                  and preserve unique artefacts
                </li>
                <li className="text-gray-800 mt-4 mb-6 mb-md-8">
                  All educational spaces where lecturing and academic writing
                  are basic but non-exclusive channels of communicating content
                  and creating new knowledge
                </li>
              </ul>
            </div>

            <h3 className="mb-5">References</h3>
            <div className="d-flex">
              <ul className="mb-0">
                <li className="text-gray-800">
                  Rick Altman, A theory of narrative. New York: Columbia
                  University Press, 2008.
                </li>
                <li className="text-gray-800 mt-4">
                  Aristotle, Poetics, edited and translated by Ingram Bywater.
                  Oxford: Oxford University Press, 1909.
                </li>
                <li className="text-gray-800 mt-4">
                  Cheryl M. Bolick, “Digital Archives: Democratizing the Doing
                  of History,” in International Journal of Social Education,
                  21/1 (Spring-Summer 2006), pp. 122-134. LINK.
                </li>
                <li className="text-gray-800 mt-4">
                  Benedetto Croce, “La storia ridotta sotto il concetto generale
                  dell'arte,” in Primi saggi, Bari: Laterza, 1951, pp. 3-41.
                </li>
                <li className="text-gray-800 mt-4">
                  Andrea Nanetti, Imola antica e medievale nella cronachistica
                  cittadina di Età moderna. Indagine esemplare per una
                  ingegnerizzazione della memoria storica [Engineering
                  Historical Memory. The Early Modern Chronicles of Ancient and
                  Medieval Imola as a showcase]. Imola: Associazione per Imola
                  storico-artistica & Editrice La Mandragora, 2008 (Atti
                  dell’AISA, XXI).
                </li>
                <li className="text-gray-800 mt-4">
                  Andrea Nanetti, Siew Ann Cheong, Mikhail Filippov, Interactive
                  Global Histories. For a new information environment to
                  increase the understanding of historical processes, in
                  Proceedings of the International Conference on Culture and
                  Computing 2013 (Kyoto, Ritsumeikan University, Sept. 16-18,
                  2013). Los Alamitos, CA: IEEE Computer Society, [September]
                  2013, pp. 104-110. Best Paper Award.
                </li>
                <li className="text-gray-800 mt-4">
                  Andrea Nanetti, Angelo Cattaneo, Siew Ann Cheong, Chin-Yew
                  Lin, Maps as Knowledge Aggregators: from Renaissance Italy Fra
                  Mauro to Web Search Engines, in «The Cartographic Journal» (©
                  The British Cartographic Society), special issue, 52/2 (May
                  2015), pp. 159-167.
                </li>
                <li className="text-gray-800 mt-4">
                  Andrea Nanetti (guest ed.). Revisiting the World of Fra
                  Mauro's Map and the Morosini Codex in an Artificial
                  Intelligence Perspective, in «The Asian Review of World
                  Histories», Vol. 4/1 (Jan. 2016), [published on 29 June 2016]
                  Special Issue (authors: Andrea Nanetti, Cheong Siew Ann,
                  Angelo Cattaneo, Mikhail Filippov, Lin Chin-Yew).
                </li>
                <li className="text-gray-800 mt-4">
                  Shen Shen Luo, Ben A. Shedd, Andrea Nanetti. Enhancing the
                  Experience of the Western Xia Imperial Tombs Heritage Site
                  (PRC, Ningxia) through Animated Installations, in «SCIRESit
                  (SCIentific RESearch and Information Technology)», Vol. 8/1
                  (June 2018), pp. 1-31 (and cover page for this issue of the
                  journal).
                </li>
                <li className="text-gray-800 mt-4">
                  Andrea Nanetti and Siew Ann Cheong, Computational History:
                  From Big Data to Big Simulations, in Shu-Heng Chen (Ed.), Big
                  Data in Computational Social Science and Humanities. Cham
                  (Switzerland): Springer International Publishing AG, 2018, Ch.
                  18 (pp. 337-363). LINK. Translated in Korean in 2019.
                </li>
                <li className="text-gray-800 mt-4">
                  Andrea Nanetti, Davide Benvenuti, Animation of two-dimensional
                  pictorial works into multipurpose three-dimensional objects.
                  The Atlas of the Ships of the Known World depicted in the 1460
                  Fra Mauro’s mappa mundi as a showcase, in «SCIRESit
                  (SCIentific RESearch and Information Technology)», Vol. 9/2
                  (2019), pp. 29-46. LINK.
                </li>
                <li className="text-gray-800 mt-4">
                  Andrea Nanetti, Overcoming Linguistic Obstacles and Cultural
                  Barriers in the Transcultural (Re)-Reading of Primary Sources
                  and Secondary Literature for Afro-Eurasian Pre-Modern History
                  (1205-1533), in Rila Mukherjee (Ed.), Order/Disorder in Asia:
                  Historical Perspectives. Kolkata (India): The Asiatic Society,
                  2021, Ch. 16. Forthcoming. Translation in Mandarin will be
                  published in 2021 by Fudan University.
                </li>

                <li className="text-gray-800 mt-4 mb-6 mb-md-8">
                  Karlheinz Stierle, “L'Histoire comme example, l'example comme
                  histoire,” in Poétique 10 (1972), pp. 176-198.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
