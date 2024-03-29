Frequently asked questions (FAQ)
================================

.. rst-class:: expand-collapse-items wrapper-expand-collapse-faq expand-all-faq

    Expand All

.. rst-class:: expand-collapse-items wrapper-expand-collapse-faq collapse-all-faq

    Collapse All

.. rst-class:: content-visible

    1. **What is Opendatasoft?**

.. rst-class:: content-hidden

    Opendatasoft is a turnkey SaaS platform developed for business users to easily share, publish and reuse structured
    datasets.

.. rst-class:: content-visible

    2. **Is Opendatasoft open source?**

.. rst-class:: content-hidden

    Opendatasoft is not open source.

    Opendatasoft is selling a service, not a software. However, some parts of the stack are open source.

    Opendatasoft's front-end is open source. It is built and packaged as a set of AngularJS directives. This project can be accessed on `GitHub <https://github.com/opendatasoft/ods-widgets>`_ and comes with a full fledged documentation.

    Opendatasoft is also already contributing to the `Elasticsearch <http://www.elasticsearch.org/>`_ project by releasing in the public space a set of plugins that we have developed and that we use internally:

    * `Hierarchical facets plugin <https://github.com/opendatasoft/elasticsearch-aggregation-pathhierarchy>`_
    * `Geo aggregations plugin <https://github.com/opendatasoft/elasticsearch-plugin-geoshape>`_
    * `Geo convex envelope plugin <https://github.com/opendatasoft/elasticsearch-aggregation-envelope>`_

.. rst-class:: content-visible

    3. **Is the Opendatasoft team managing data on behalf of its customers?**

.. rst-class:: content-hidden
   
    No.

    Opendatasoft sells a turnkey solution. Users manage their datasets on their domains by themselves. Of course, the Opendatasoft support team is more than willing to help handling complex / specific data management issues.

    Moreover, Opendatasoft maintains a `data network <https://data.opendatasoft.com/>`_ which federates public datasets published by Opendatasoft customers as well as datasets published by the Opendatasoft staff.

.. rst-class:: content-visible

    4. **I'm representing a public administration. My country has already setup an Open Data initiative. Why should I have my own data portal?**

.. rst-class:: content-hidden

    Open Data is about making data that has been produced by public administrations available to citizens. But most of the
    time, one may want to go beyond the simple delivery of raw files and:

    * Contextualize & increase the value of data
    * Make data easy-to-understand for citizens
    * Provide open services to an ecosystem of developers / reusers

    To that extent, having a data management tool tailored to your needs is mandatory and keep in mind that thanks to the Open APIs provided by Opendatasoft, your national Open Data portal will always have the possibility to reference your public datasets.

.. rst-class:: content-visible

    5. **If I publish datasets on Opendatasoft, will they automatically be available to everyone on the Web?**

.. rst-class:: content-hidden
    
    No.

    The Opendatasoft platform can be used for both public and private data management projects. A given platform can even
    host public and private datasets. It is also possible to define the ACL of a recordset at the dataset level.

.. rst-class:: content-visible

    6. **What file formats are supported by Opendatasoft?**

.. rst-class:: content-hidden

    The Opendatasoft platform natively supports the following file formats:

    * ``CSV````
    * ``GeoJSON``
    * ``JSON``
    * ``JSON lines``
    * ``KML``
    * ``OSM archives (OpenStreetMap)``
    * ``Shapefile``
    * ``MapInfo``
    * ``Excel``
    * ``OpenDocument Spreadsheet``
    * ``Remotely stored files for any of the above formats (HTTP or FTP)``

    Specific format parsers can also be made available by the Opendatasoft team for specific requirements.

    The Opendatasoft platform is also able to connect to remote Web services. Opendatasoft supports the following services in its standard version:

    * ``ArcGIS REST API``
    * ``RSS / Atom feeds``
    * ``Salesforce / Force.com`` (you'll have to ask Opendatasoft support to activate it on your domain)

    Custom connectivity capabilities can be added upon request.

.. rst-class:: content-visible

    7. **What metadata standards does Opendatasoft support?**

.. rst-class:: content-hidden

    Opendatasoft natively uses a subset of `DCAT <http://www.w3.org/TR/vocab-dcat/>`_ to describe datasets. The following
    metadata are available by default:

    * ``title``
    * ``description``
    * ``language``
    * ``theme``
    * ``keyword``
    * ``license``
    * ``publisher``
    * ``reference``

    It is possible to activate the full DCAT template, thus adding the following additional metadata:

    * ``created``
    * ``issued``
    * ``creator``
    * ``contributor``
    * ``accrual periodicity``
    * ``spatial``
    * ``temporal``
    * ``granularity``
    * ``data quality``

    A full `INSPIRE <http://inspire.ec.europa.eu/index.cfm/pageid/101>`_ template is also available and can be activated on
    demand.

    The metadata template can be customized (adding custom metadata). To do so, simply issue a support request from your Opendatasoft's back-office.

.. rst-class:: content-visible

    8. **How many datasets can I create?**

.. rst-class:: content-hidden

    You can create as many datasets as you want within the limit set in your licensing plan.

.. rst-class:: content-visible

    9. **How could I modify the look & feel of my Opendatasoft domain?**

.. rst-class:: content-hidden

    As a domain administrator, you can fully customize the styling of your portal. Logos, pictos, colors, styles as well as the header, the footer and the dataset box layout in the catalog page can be fully customized.

.. rst-class:: content-visible

    10. **How can other people collaborate on dataset configuration?**

.. rst-class:: content-hidden

    Use the security section in your dataset's configuration page in Opendatasoft's back-office to give other users or groups of users a write access to the dataset. These users should also have access to your domain to access your dataset. If this is not the case already, you should contact your domain administrator.

.. rst-class:: content-visible

    11. **How can I transform and enrich my datasets?**

.. rst-class:: content-hidden

    A rich set of processing features is made available in the publishing console. Simply hit the **Add Processor** button.

.. rst-class:: content-visible

    12. **Can I geocode a full-text address?**

.. rst-class:: content-hidden

    Yes.

    Opendatasoft supports Google and ESRI geocoding services. However, Opendatasoft doesn't come with geocoding API keys.
    The domain administrator has to configure a geocoding API key for one of these services in the back-office configuration (*Configuration > Data processing*).

.. rst-class:: content-visible

    13. **I have geocoded data in my dataset but the map view doesn't display anything. What went wrong?**

.. rst-class:: content-hidden

    Remember that you dataset must contain at least a field of type **Geo Point** or **Geo Shape**

    * Geo Point: ``latitude,longitude`` in WGS84, e.g.: ``48.2567,3.7689``.
    * Geo Shape: any valid Geo JSON geometry in WGS84

.. rst-class:: content-visible

    14. **What is a facet?**

.. rst-class:: content-hidden

    Facets are the backbone of most of the features made available by the Opendatasoft platform. A facet is simply a field
    which has been given specific filtering and aggregation capabilities.

    .. image:: faq__facet-configuration--en.jpg
        :alt: Facet configuration

    In the example above, the fields **country** and **year** have been defined as facets (notice the filter button next to
    the type select).

    Facets can be seen as dimensions of a dataset. Facets can be defined on the following field types:

    * ``date``
    * ``datetime``
    * ``text``
    * ``int``
    * ``decimal``

    Facets shall only be configured for fields that have a small number of different values compared to the number of
    records in a dataset. For instance, defining a facet on an field that would uniquely identify a record is useless as
    filtering on this field wouldn't bring any added value.

    Facets are then used in a couple of places.

    You can first use them to filter dataset records in the explore console.

    .. image:: faq__facet-explore--en.png
        :alt: Refine on facets

    As dimensions, facets support aggregations. You can thus use them to build advanced charts, as in the example below.

    .. image:: faq__facet-chart--en.png
        :alt: Build charts with facets

.. rst-class:: content-visible

    15. **I have an Opendatasoft free trial account, how can I get a premium account?**

.. rst-class:: content-hidden

    Please send a message to <contact@opendatasoft.com>.

    We will be happy to discuss your needs and to propose you one of our plans.

.. rst-class:: content-visible

    16. **How can I display points on a map?**

.. rst-class:: content-hidden

    For a geo data visualization to be available, your dataset needs to contain a **Geo Point 2D** field with content in
    the ``latitude,longitude`` format. For instance: ``48.2567,3.7689``.

.. rst-class:: content-visible

    17. **In the table view, I have not been able to sort the results using a specific field? What went wrong?**

.. rst-class:: content-hidden

    By default, only the numerical fields are sortable. That is, fields having one of the following types:

    * ``int``
    * ``double``
    * ``date``
    * ``datetime``

    **Text** fields are not sortable by default. The dataset owner may configure some text fields to be sortable. Sortable **text** fields can be identified through the API (``sortable`` annotation).

.. rst-class:: content-visible

    18. **I published a dataset, but no category is displayed in the left column. What shall I do?**

.. rst-class:: content-hidden

    Categories (facets) are built out of fields which have been defined as a **facet**. To set a field as a facet, simply
    click on the **filter** icon, in the field definition header in the publishing console.

.. rst-class:: content-visible

    18. **When I go to the analyze view, the displayed chart doesn't make any sense. How could I change this?**

.. rst-class:: content-hidden

    The dataset owner can easily define the default analytical representation of the dataset using the **analyze tab** in
    the publishing console. End-users can also simply choose different settings and build their own analytical data
    visualization using the available controls.

.. rst-class:: content-visible

    19. **How can I embed a data visualization on my website?**

.. rst-class:: content-hidden

    There are three ways to embed Opendatasoft's data visualizations on a website or any content management system:

    * Copy-paste the embed code that can directly be found on the Opendatasoft platform (usually located under the data visualization itself).
    * Use `ODS Widgets, our open source widget library <https://github.com/opendatasoft/ods-widgets>`_ to build content pages tailored to your needs with one or several data visualizations at once.
    * Use Opendatasoft's HTTP/REST APIs to develop your own embed.

.. rst-class:: content-visible

    20. **What is "Cartograph"?**

.. rst-class:: content-hidden

    Cartograph is a tool developed by Opendatasoft to make it possible to build geo mashups out of datasets stored on the
    Opendatasoft platform.

.. rst-class:: content-visible

    21. **What does API mean?**

.. rst-class:: content-hidden

    API is an acronym for Applications Programming Interface. An API is a set of methods for computer programs to exchange information in an autonomous way. Opendatasoft APIs allow for remote access to datasets using the HTTP protocol.

.. rst-class:: content-visible

    22. **What are APIs made for?**

.. rst-class:: content-hidden

    APIs are a set of tools that developers can use to integrate data in their applications (Web applications, mobile
    applications, business applications...).

.. rst-class:: content-visible

    23. **How many API calls can I perform?**

.. rst-class:: content-hidden

    API endpoints are associated with quotas. Opendatasoft customers can configure their own quotas policy. Contact your
    Opendatasoft domain owner for more details.

.. rst-class:: content-visible

    24. **Does every dataset have its own APIs?**

.. rst-class:: content-hidden

    Yes.

    Whenever you publish a dataset, a dedicated API is created. See `APIs documentation <https://docs.opendatasoft.com/en/using_api/index.html>`_ for more information.

.. rst-class:: content-visible

    25. **What are the compatible browsers for Opendatasoft's platform?**

.. rst-class:: content-hidden

    .. tabularcolumns:: |C|C|

    +----------------------------------+------------------------------------------------------------------------+
    | Browser                          | Supported versions                                                     |
    +==================================+========================================================================+
    | |firefox| **Firefox**            |                                                                        |
    |                                  | Latest version                                                         |
    |                                  |                                                                        |
    |                                  | `Latest ESR version <https://www.mozilla.org/firefox/enterprise/>`_    |
    +----------------------------------+------------------------------------------------------------------------+
    | |chrome| **Chrome**              |                                                                        |
    |                                  | Latest version                                                         |
    +----------------------------------+------------------------------------------------------------------------+
    | |safari| **Safari**              |                                                                        |
    |                                  | Latest version                                                         |
    +----------------------------------+------------------------------------------------------------------------+
    | |edge| **Edge**                  |                                                                        |
    |                                  | Latest version                                                         |
    +----------------------------------+------------------------------------------------------------------------+


    .. |edge| image:: browser-logos/edge_64x64.png
        :alt: Edge
        :width: 32

    .. |chrome| image:: browser-logos/chrome_64x64.png
        :alt: Chrome
        :width: 32

    .. |firefox| image:: browser-logos/firefox_64x64.png
        :alt: Firefox
        :width: 32

    .. |safari| image:: browser-logos/safari_64x64.png
        :alt: Safari
        :width: 32
