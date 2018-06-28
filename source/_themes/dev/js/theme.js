var jQuery = (typeof (window) != 'undefined') ? window.jQuery : require('jquery');

function setMenu() {
    $("[data-toggle='wy-nav-shift']").toggleClass("shift");
    $("[data-toggle='rst-versions']").toggleClass("shift");
    $("#nav-button")
        .toggleClass("ods__documentation-header-btn-active");
}

function setHub() {
    $('.ods__documentation-help-hub-sidebar')
        .toggleClass('ods__documentation-help-hub-sidebar-active');
    $("#help-hub-button")
        .toggleClass("ods__documentation-header-btn-active");
}

// Sphinx theme nav state
function ThemeNav() {

    var nav = {
        navBar: null,
        win: null,
        winScroll: false,
        winResize: false,
        linkScroll: false,
        winPosition: 0,
        winHeight: null,
        docHeight: null,
        isRunning: false
    };

    nav.enable = function (withStickyNav) {
        var self = this;

        if (self.isRunning) {
            // Only allow enabling nav logic once
            return;
        }

        self.isRunning = true;
        jQuery(function ($) {
            self.init($);

            self.reset();
            self.win.on('hashchange', self.reset);

            if (withStickyNav) {
                // Set scroll monitor
                self.win.on('scroll', function () {
                    if (!self.linkScroll) {
                        if (!self.winScroll) {
                            self.winScroll = true;
                            requestAnimationFrame(function () { 
                                self.onScroll(); 
                            });
                        }
                    }
                });
            }

            // Set resize monitor
            self.win.on('resize', function () {
                if (!self.winResize) {
                    self.winResize = true;
                    requestAnimationFrame(function () { self.onResize(); });
                }
            });

            self.onResize();
        });

    };

    nav.enableSticky = function () {
        this.enable(true);
    };

    nav.init = function ($) {
        var doc = $(document),
            self = this;

        this.navBar = $('div.wy-side-scroll:first');
        this.win = $(window);

        // Set up javascript UX bits
        $(document)
            // Shift nav in mobile when clicking the menu.
            .on('click', "[data-toggle='wy-nav-top']", function () {
                if ($(".ods__documentation-help-hub-sidebar")
                    .hasClass("ods__documentation-help-hub-sidebar-active")) {
                    setHub();
                    setMenu();
                } else {
                    setMenu();
                }
            })

            // Nav menu link click operations
            .on('click', ".wy-menu-vertical .current ul li a", function () {
                var target = $(this);
                // Close menu when you click a link.
                setMenu();
                // Handle dynamic display of l3 and l4 nav lists
                self.toggleCurrent(target);
                self.hashChange();
            })
            .on('click', "[data-toggle='rst-current-version']", function () {
                $("[data-toggle='rst-versions']").toggleClass("shift-up");
            })

        // Make tables responsive
        $("table.docutils:not(.field-list,.footnote,.citation)")
            .wrap("<div class='wy-table-responsive'></div>");

        // Add extra class to responsive tables that contain
        // footnotes or citations so that we can target them for styling
        $("table.docutils.footnote")
            .wrap("<div class='wy-table-responsive footnote'></div>");
        $("table.docutils.citation")
            .wrap("<div class='wy-table-responsive citation'></div>");

        // Add expand links to all parents of nested ul
        $('.wy-menu-vertical ul').not('.simple').siblings('a').each(function () {
            var link = $(this);
            expand = $('<span class="toctree-expand"></span>');
            expand.on('click', function (ev) {
                self.toggleCurrent(link);
                ev.stopPropagation();
                return false;
            });
            link.prepend(expand);
        });
    };

    nav.reset = function () {
        // Get anchor from URL and open up nested nav
        var anchor = encodeURI(window.location.hash) || '#';

        try {
            var link = $('.wy-menu-vertical')
                .find('[href="' + anchor + '"]');
            // If we didn't find a link, it may be because we clicked on
            // something that is not in the sidebar (eg: when using
            // sphinxcontrib.httpdomain it generates headerlinks but those
            // aren't picked up and placed in the toctree). So let's find
            // the closest header in the document and try with that one.
            if (link.length === 0) {
                var doc_link = $('.document a[href="' + anchor + '"]');
                var closest_section = doc_link.closest('div.section');
                // Try again with the closest section entry.
                link = $('.wy-menu-vertical')
                    .find('[href="#' + closest_section.attr("id") + '"]');
            }
            // If we found a matching link then reset current and re-apply
            // otherwise retain the existing match
            if (link.length > 0) {
                $('.wy-menu-vertical .current').removeClass('current');

                link.parent().addClass('current current-active');
                link.closest('li.toctree-l1').addClass('current current');
                link.closest('li.toctree-l1').parent().addClass('current');
                link.closest('li.toctree-l1').addClass('current');
                link.closest('li.toctree-l2').addClass('current');
                link.closest('li.toctree-l3').addClass('current');
                link.closest('li.toctree-l4').addClass('current');
            }
        }
        catch (err) {
            console.log("Error expanding nav for anchor", err);
        }

    };

    nav.onScroll = function () {
        this.winScroll = false;
        var newWinPosition = this.win.scrollTop(),
            winBottom = newWinPosition + this.winHeight,
            navPosition = this.navBar.scrollTop(),
            newNavPosition = navPosition + (newWinPosition - this.winPosition);
        if (newWinPosition < 0 || winBottom > this.docHeight) {
            return;
        }
        this.navBar.scrollTop(newNavPosition + 200);
        this.winPosition = newWinPosition;
    };

    nav.onResize = function () {
        this.winResize = false;
        this.winHeight = this.win.height();
        this.docHeight = $(document).height();
    };

    nav.hashChange = function () {
        this.linkScroll = true;
        this.win.one('hashchange', function () {
            this.linkScroll = false;
        });
    };

    nav.toggleCurrent = function (elem) {

        var parent_li = elem.closest('li');

        parent_li.parent().parent().removeClass('current-active');
        parent_li.siblings('li.current').removeClass('current current-active');
        parent_li.siblings().find('li.current').removeClass('current current-active');
        parent_li.find('> ul li.current').removeClass('current current-active');
        parent_li.toggleClass('current current-active');

    }

    return nav;
};

module.exports.ThemeNav = ThemeNav();

if (typeof (window) != 'undefined') {
    window.OdsTheme = { Navigation: module.exports.ThemeNav };
}

// ODS Theme Header
$('#help-hub-button').click(function() {
    if ($("[data-toggle='wy-nav-shift']").hasClass("shift")) {
        setMenu();
        setHub();
    } else {
        setHub();
    }
});

// scroll content below ods_header 
$('.internal').on('click', function (event) {
    var target = $(this)[0].attributes.href.nodeValue;

    if (target.indexOf('#') !== -1) {
        event.preventDefault();

        if (target == '#') {
            window.location.hash = "";
        } else {
            hash_url = target.split('#');
            window.location.hash = '#' + hash_url[1];

            res_target = $('#' + target.split('#')[1]).offset().top;
            setTimeout(function () {
                $('html').animate({ scrollTop: res_target - 110 }, 0);
            }, 0);
        }

    } else {
        return null;
    }
});

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// https://gist.github.com/paulirish/1579671
// MIT license

(function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
            || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };

    /////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////
    //
    //  Description
    //
    /////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////
    /*
     *
     *  Variables
     *
     */
    let classContentVisible = 'content-visible';
    let classContentHidden = 'content-hidden';
    let classContentVisibleActive = 'content-visible-active';
    let classContentHiddenActive = 'content-hidden-active';

    let countElementVisibleFAQ = 0;
    let countElementVisibleActiveFAQ = 0;
    let countElementVisibleGlossary = 0;
    let countElementVisibleActiveGlossary = 0;

    let elementsExpandCollapseFAQ = $('.wrapper-expand-collapse-faq');
    let elementsExpandCollapseGlossary = $('.wrapper-expand-collapse-glossary');
    let wrapperPattern = `<div class="wrapper-expand-collapse">
                          </div>`;
    let expandCollapseClassActive = 'wrapper-expand-collapse-items-active';
    let elementClickExpandFAQ = $('.expand-all-faq');
    let elementClickCollapseFAQ = $('.collapse-all-faq');
    let elementClickExpandGlossary = $('.expand-all-glossary');
    let elementClickCollapseGlossary = $('.collapse-all-glossary');
    let sectionFAQElement = $('#frequently-asked-questions-faq');
    let sectionGlossaryElement = $('#glossary');

    /*
     *
     *  Generic functions
     *
     */
    let removeClass = function (element, className) {
        let reg = new RegExp(`(^|)${className}($|)`, 'g');
        element.className = element.className.replace(reg, '');
    }

    /*
     *
     *  Open/Close element and active item selected
     *
     */

    //- Replace className 'content-hidden' for tables
    for (let i = 0; i < $(`.${classContentVisible}`).next().length; i++) {
        if ($('.content-visible').next()[i].tagName.indexOf('P') === -1) {
            removeClass($(`.${classContentVisible}`).next()[i], classContentHidden);

            //- DIV which wrappe <table> appears after DOM rendering
            setTimeout(function () {
                $('.wy-table-responsive').addClass(classContentHidden);
            }, 500);
        }
    }

    //- Add action class at all elements after element click
    let changeClassActive = function(element, action) {
        while (element) {
            element[action](classContentHiddenActive);
            element = element.next();
            if (element.hasClass(classContentVisible) || !element[0]) {
                element = false;
            }
        }
    }

    //- Function Open/Close element
    let toggleContentActive = function (nextElement, classContentHiddenActive, thisElement) {
        if (thisElement.hasClass(classContentVisibleActive)) {
            changeClassActive(nextElement, 'removeClass');
            thisElement.removeClass(classContentVisibleActive);
        } else {
            changeClassActive(nextElement, 'addClass');
            thisElement[0].classList.add(classContentVisibleActive);
        }
    }

    //- Click to action Open/Close
    $(`.${classContentVisible}`).click(function () {
        let nextElement = $(this).next();

        toggleContentActive(nextElement, classContentHiddenActive, $(this));
        changeCarretClass($(this)[0]);

        //- All elements in section are open -> Collapse all
        AllElementsOpenedToChangeExpand(
            sectionFAQElement[0].children,
            elementClickExpandFAQ,
            elementClickCollapseFAQ,
            countElementVisibleFAQ,
            countElementVisibleActiveFAQ
        );

        AllElementsOpenedToChangeExpand(
            sectionGlossaryElement[0].children,
            elementClickExpandGlossary,
            elementClickCollapseGlossary,
            countElementVisibleGlossary,
            countElementVisibleActiveGlossary
        );
    });

    let AllElementsOpenedToChangeExpand = function (sectionChildren, expandElement, collapseElement, countElementVisible, countElementVisibleActive) {
        for (let p = 0; p < sectionChildren.length; p++) {
            if (sectionChildren[p].className.indexOf(classContentVisible) > -1) {
                countElementVisible++;
            }
            if (sectionChildren[p].className.indexOf(classContentVisibleActive) > -1) {
                countElementVisibleActive++;
            }
        }
        if (countElementVisible === countElementVisibleActive) {
            $(expandElement).removeClass(expandCollapseClassActive);
            $(collapseElement).addClass(expandCollapseClassActive);
        } else {
            $(expandElement).addClass(expandCollapseClassActive);
            $(collapseElement).removeClass(expandCollapseClassActive);
        }
    }

    /*
     *
     *  Buttons expand/collapse all elements
     *
     */

    //- Wrap div around p
    $(elementsExpandCollapseFAQ).wrapAll(wrapperPattern);
    $(elementsExpandCollapseGlossary).wrapAll(wrapperPattern);

    //- Add class active to expand all
    $(elementClickExpandFAQ).addClass(expandCollapseClassActive);
    $(elementClickExpandGlossary).addClass(expandCollapseClassActive);

    //- Expand all elements
    let expandAllAction = function (contentsSection, expandElement, collapseElement) {
        for (let a = 0; a < contentsSection.length; a++) {
            if (contentsSection[a].className.indexOf(classContentHidden) > -1) {
                if (contentsSection[a].className.indexOf(classContentHiddenActive) === -1) {
                    contentsSection[a].classList.add(classContentHiddenActive);
                }
            }
            if (contentsSection[a].className.indexOf(classContentVisible) > -1) {
                if (contentsSection[a].className.indexOf(classContentVisibleActive) === -1) {
                    contentsSection[a].classList.add(classContentVisibleActive);
                    changeCarretClass(contentsSection[a]);
                }
            }
        }
        $(expandElement).removeClass(expandCollapseClassActive);
        $(collapseElement).addClass(expandCollapseClassActive);
    }

    //- Expand all FAQ
    $(elementClickExpandFAQ).click(function () {
        expandAllAction(
            $(sectionFAQElement)[0].children,
            elementClickExpandFAQ,
            elementClickCollapseFAQ
        );
    });

    //- Expand all Glossary
    $(elementClickExpandGlossary).click(function () {
        expandAllAction(
            $(sectionGlossaryElement)[0].children,
            elementClickExpandGlossary,
            elementClickCollapseGlossary
        );
    });

    //- Collapse all elements
    let collapseAllAction = function (contentsSection, collapseElement, expandElement) {
        for (let a = 0; a < contentsSection.length; a++) {
            if (contentsSection[a].className.indexOf(classContentHidden) > -1) {
                removeClass(contentsSection[a], classContentHiddenActive);
            }
            if (contentsSection[a].className.indexOf(classContentVisible) > -1) {
                removeClass(contentsSection[a], classContentVisibleActive);
                changeCarretClass(contentsSection[a]);
            }
        }
        $(collapseElement).removeClass(expandCollapseClassActive);
        $(expandElement).addClass(expandCollapseClassActive);
    }

    //- Collapse all FAQ
    $(elementClickCollapseFAQ).click(function () {
        collapseAllAction(
            $(sectionFAQElement)[0].children,
            elementClickCollapseFAQ,
            elementClickExpandFAQ
        );
        //- Reset count
        countElementVisibleActiveFAQ = 0;
    });

    //- Collapse all Glossary
    $(elementClickCollapseGlossary).click(function () {
        collapseAllAction(
            $(sectionGlossaryElement)[0].children,
            elementClickCollapseGlossary,
            elementClickExpandGlossary
        );
        //- Reset count
        countElementVisibleActiveGlossary = 0;
    });

    /*
     *
     *  Generate classes for carret on question/category
     *
     */
    let classCarretUp = 'carret-up';
    let classCarretDown = 'carret-down';

    for (let w = 0; w < $(`.${classContentVisible}`).length; w++) {
        $(`.${classContentVisible}`)[w].classList.add(classCarretDown);
    }

    //- Change carret class
    let changeCarretClass = function (element) {
        if (element.className.indexOf(classContentVisibleActive) > -1) {
            removeClass(element, classCarretDown);
            element.classList.add(classCarretUp);
        } else {
            removeClass(element, classCarretUp);
            element.classList.add(classCarretDown);
        }
    }

    /*
     *
     *  Active current lang on item lang
     *
     */
    let itemLang = $(window).width() > 930 ? $('.footer-container__langs-items') : $('.header__langs-items');
    let currentLang = $('#currentLang').text();

    for (let o = 0; o < itemLang.length; o++) {
        if (itemLang[o].attributes[0].nodeValue.indexOf(currentLang) > -1) {
            itemLang[o].classList.add('lang-active');
        }
    }
}());