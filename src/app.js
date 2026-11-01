import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './styles.css';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


// Build the document with DOM APIs. No HTML strings or innerHTML are used for the static interface.
function createElement(tag, attributes = {}, children = []) {
  const element = document.createElement(tag);
  for (const [name, value] of Object.entries(attributes)) {
    if (value === true) element.setAttribute(name, '');
    else if (value !== false && value != null) {
      if (name === 'className') element.className = value;
      else if (name === 'htmlFor') element.htmlFor = value;
      else element.setAttribute(name, value);
    }
  }
  for (const child of children) {
    element.append(child instanceof Node ? child : document.createTextNode(child));
  }
  return element;
}

function createSvgElement(tag, attributes = {}) {
  const element = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, value);
  return element;
}

function mountApp() {
  document.documentElement.lang = 'en';
  document.documentElement.className = 'scroll-smooth [scroll-padding-top:90px]';
  document.head.append(
  createElement("meta", {"charset":"utf-8"}),
  createElement("meta", {"content":"wdpJILycECpySr05_4fzGhK5r75ombkyNRIyUVb9jv8","name":"google-site-verification"}),
  createElement("meta", {"content":"width=device-width, initial-scale=1.0","name":"viewport"}),
  createElement("meta", {"content":"#f4f0e8","name":"theme-color"}),
  createElement("meta", {"content":"GeoTrail is a tourism intelligence platform exploring destination attention, visitor behaviour and travel signals across India, Japan, England and the United States. Engineered by Kenny Richardson.","name":"description"}),
  createElement("meta", {"content":"Kenny Richardson","name":"author"}),
  createElement("meta", {"content":"Kenny Richardson","name":"creator"}),
  createElement("meta", {"content":"GeoTrail, tourism analytics, destination intelligence, travel data, tourism dashboard, Kenny Richardson, kennykrichardson","name":"keywords"}),
  createElement("meta", {"content":"index,follow,max-image-preview:large","name":"robots"}),
  createElement("link", {"href":"/favicon.ico","rel":"icon","sizes":"any"}),
  createElement("link", {"href":"/favicon.png","rel":"icon","sizes":"96x96","type":"image/png"}),
  createElement("link", {"href":"/favicon.svg","rel":"icon","type":"image/svg+xml"}),
  createElement("link", {"href":"/apple-touch-icon.png","rel":"apple-touch-icon"}),
  createElement("link", {"href":"/manifest.json","rel":"manifest"}),
  createElement("link", {"href":"https://fonts.googleapis.com","rel":"preconnect"}),
  createElement("link", {"crossorigin":"","href":"https://fonts.gstatic.com","rel":"preconnect"}),
  createElement("link", {"href":"https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap","rel":"stylesheet"}),
  createElement("meta", {"content":"website","property":"og:type"}),
  createElement("meta", {"content":"GeoTrail • Explore Beyond the Map","property":"og:title"}),
  createElement("meta", {"content":"A richer view of the world's travel signals. Discover destination attention and visitor behaviour across four countries.","property":"og:description"}),
  createElement("meta", {"content":"/og-image.png","property":"og:image"}),
  createElement("meta", {"content":"GeoTrail tourism intelligence dashboard by Kenny Richardson","property":"og:image:alt"}),
  createElement("meta", {"content":"summary_large_image","name":"twitter:card"}),
  createElement("meta", {"content":"GeoTrail • Explore Beyond the Map","name":"twitter:title"}),
  createElement("meta", {"content":"Tourism intelligence, destination attention and visitor behaviour.","name":"twitter:description"}),
  createElement("meta", {"content":"/og-image.png","name":"twitter:image"}),
  createElement("title", {}, [
      "GeoTrail • Explore Beyond the Map"
  ]),
  createElement("script", {"type":"application/ld+json"}, [
      "\n  {\"@context\":\"https://schema.org\",\"@type\":\"SoftwareApplication\",\"name\":\"GeoTrail\",\"applicationCategory\":\"TravelApplication\",\"operatingSystem\":\"Web\",\"description\":\"A browser-based tourism intelligence dashboard for India, Japan, England and the United States.\",\"author\":{\"@type\":\"Person\",\"name\":\"Kenny Richardson\",\"alternateName\":[\"kennykrichardson\",\"Kenny Richardson Kodipally\"],\"url\":\"https://linkedin.com/in/kennykrichardson\"},\"creator\":{\"@type\":\"Person\",\"name\":\"Kenny Richardson\"}}\n  "
  ])
  );
  document.body.className = 'min-h-screen bg-paper font-sans text-sm text-ink';
  const appRoot = createElement('div', { id: 'app' }, [
  createElement("div", {"className":"app-shell min-h-screen"}, [
      createElement("aside", {"className":"sidebar fixed inset-y-0 left-0 z-[100] flex w-[254px] flex-col px-5 pt-[29px] pb-5 transition-transform duration-200 max-[1200px]:w-[225px] max-[1100px]:-translate-x-full max-[1100px]:[&.open]:translate-x-0 border-r border-ink/20 bg-paper text-ink","id":"sidebar"}, [
          createElement("a", {"aria-label":"GeoTrail home","className":"brand flex items-center gap-3 no-underline text-ink px-[7px] pb-[42px]","href":"#overview"}, [
              createElement("span", {"className":"brand-mark relative grid h-[38px] w-[38px] shrink-0 place-items-center border border-ink bg-crimson font-display text-[22px] font-extrabold text-ink"}, [
                  "G",
                  createElement("span", {"className":"absolute right-1 top-[3px] text-[11px] text-ink"}, [
                      "✳"
                  ])
              ]),
              createElement("span", {"className":"brand-copy flex flex-col gap-[3px]"}, [
                  createElement("b", {"className":"font-display text-[15px] font-extrabold tracking-[.19em]"}, [
                      "GEOTRAIL"
                  ]),
                  createElement("small", {"className":"font-mono text-[8px] tracking-[.11em]"}, [
                      "DESTINATION INTELLIGENCE"
                  ])
              ])
          ]),
          createElement("div", {"className":"side-label px-[10px] pb-[13px] font-mono text-[9px] tracking-[.11em]"}, [
              "WORKSPACE"
          ]),
          createElement("nav", {"aria-label":"Main navigation","className":"side-nav grid gap-[5px]"}, [
              createElement("a", {"className":"nav-link active group flex h-11 items-center gap-3 rounded-[3px] border-l-[3px] border-l-transparent px-[11px] text-[12px] font-semibold text-ink no-underline transition-colors duration-150 motion-reduce:transition-none hover:border-l-ink hover:bg-crimson hover:text-paper focus-visible:border-l-ink focus-visible:bg-crimson focus-visible:text-paper [&.active]:border-l-ink [&.active]:bg-crimson [&.active]:text-paper hover:[&_*]:text-paper focus-visible:[&_*]:text-paper [&.active_*]:text-paper","href":"#overview"}, [
                  createElement("span", {"className":"w-[19px] text-center text-[18px]"}, [
                      "◫"
                  ]),
                  " Overview ",
                  createElement("i", {"className":"ml-auto font-mono text-[9px] not-italic"}, [
                      "01"
                  ])
              ]),
              createElement("a", {"className":"nav-link group flex h-11 items-center gap-3 rounded-[3px] border-l-[3px] border-l-transparent px-[11px] text-[12px] font-semibold text-ink no-underline transition-colors duration-150 motion-reduce:transition-none hover:border-l-ink hover:bg-crimson hover:text-paper focus-visible:border-l-ink focus-visible:bg-crimson focus-visible:text-paper [&.active]:border-l-ink [&.active]:bg-crimson [&.active]:text-paper hover:[&_*]:text-paper focus-visible:[&_*]:text-paper [&.active_*]:text-paper","href":"#explore"}, [
                  createElement("span", {"className":"w-[19px] text-center text-[18px]"}, [
                      "◎"
                  ]),
                  " Explore map ",
                  createElement("i", {"className":"ml-auto font-mono text-[9px] not-italic"}, [
                      "02"
                  ])
              ]),
              createElement("a", {"className":"nav-link group flex h-11 items-center gap-3 rounded-[3px] border-l-[3px] border-l-transparent px-[11px] text-[12px] font-semibold text-ink no-underline transition-colors duration-150 motion-reduce:transition-none hover:border-l-ink hover:bg-crimson hover:text-paper focus-visible:border-l-ink focus-visible:bg-crimson focus-visible:text-paper [&.active]:border-l-ink [&.active]:bg-crimson [&.active]:text-paper hover:[&_*]:text-paper focus-visible:[&_*]:text-paper [&.active_*]:text-paper","href":"#signals"}, [
                  createElement("span", {"className":"w-[19px] text-center text-[18px]"}, [
                      "⌁"
                  ]),
                  " Travel signals ",
                  createElement("i", {"className":"ml-auto font-mono text-[9px] not-italic"}, [
                      "03"
                  ])
              ]),
              createElement("a", {"className":"nav-link group flex h-11 items-center gap-3 rounded-[3px] border-l-[3px] border-l-transparent px-[11px] text-[12px] font-semibold text-ink no-underline transition-colors duration-150 motion-reduce:transition-none hover:border-l-ink hover:bg-crimson hover:text-paper focus-visible:border-l-ink focus-visible:bg-crimson focus-visible:text-paper [&.active]:border-l-ink [&.active]:bg-crimson [&.active]:text-paper hover:[&_*]:text-paper focus-visible:[&_*]:text-paper [&.active_*]:text-paper","href":"#segments"}, [
                  createElement("span", {"className":"w-[19px] text-center text-[18px]"}, [
                      "◷"
                  ]),
                  " Visitor profiles ",
                  createElement("i", {"className":"ml-auto font-mono text-[9px] not-italic"}, [
                      "04"
                  ])
              ])
          ]),
          createElement("div", {"className":"side-label collection-label px-[10px] pb-[13px] font-mono text-[9px] tracking-[.11em] mt-[39px]"}, [
              "COLLECTIONS"
          ]),
          createElement("div", {"className":"country-list grid gap-[3px]"}, [
              createElement("button", {"className":"country-choice active flex items-center gap-[11px] rounded-[3px] border-0 border-l-[3px] border-l-transparent bg-transparent p-[10px] text-left text-[12px] text-ink transition-colors duration-150 motion-reduce:transition-none hover:border-l-ink hover:bg-crimson hover:text-paper focus-visible:border-l-ink focus-visible:bg-crimson focus-visible:text-paper [&.active]:border-l-ink [&.active]:bg-crimson [&.active]:font-bold [&.active]:text-paper hover:[&_*]:text-paper focus-visible:[&_*]:text-paper [&.active_*]:text-paper cursor-pointer","data-country":"All"}, [
                  createElement("span", {"className":"flag w-5 text-[15px]"}, [
                      "✦"
                  ]),
                  createElement("span", {}, [
                      "All destinations"
                  ]),
                  createElement("b", {"className":"ml-auto font-mono text-[9px]"}, [
                      "04"
                  ])
              ]),
              createElement("button", {"className":"country-choice flex items-center gap-[11px] rounded-[3px] border-0 border-l-[3px] border-l-transparent bg-transparent p-[10px] text-left text-[12px] text-ink transition-colors duration-150 motion-reduce:transition-none hover:border-l-ink hover:bg-crimson hover:text-paper focus-visible:border-l-ink focus-visible:bg-crimson focus-visible:text-paper [&.active]:border-l-ink [&.active]:bg-crimson [&.active]:font-bold [&.active]:text-paper hover:[&_*]:text-paper focus-visible:[&_*]:text-paper [&.active_*]:text-paper cursor-pointer","data-country":"Indian Tourism"}, [
                  createElement("span", {"className":"flag w-5 text-[15px]"}, [
                      "🇮🇳"
                  ]),
                  createElement("span", {}, [
                      "India"
                  ]),
                  createElement("b", {"className":"ml-auto font-mono text-[9px]"}, [
                      "IN"
                  ])
              ]),
              createElement("button", {"className":"country-choice flex items-center gap-[11px] rounded-[3px] border-0 border-l-[3px] border-l-transparent bg-transparent p-[10px] text-left text-[12px] text-ink transition-colors duration-150 motion-reduce:transition-none hover:border-l-ink hover:bg-crimson hover:text-paper focus-visible:border-l-ink focus-visible:bg-crimson focus-visible:text-paper [&.active]:border-l-ink [&.active]:bg-crimson [&.active]:font-bold [&.active]:text-paper hover:[&_*]:text-paper focus-visible:[&_*]:text-paper [&.active_*]:text-paper cursor-pointer","data-country":"Japan Tourism"}, [
                  createElement("span", {"className":"flag w-5 text-[15px]"}, [
                      "🇯🇵"
                  ]),
                  createElement("span", {}, [
                      "Japan"
                  ]),
                  createElement("b", {"className":"ml-auto font-mono text-[9px]"}, [
                      "JP"
                  ])
              ]),
              createElement("button", {"className":"country-choice flex items-center gap-[11px] rounded-[3px] border-0 border-l-[3px] border-l-transparent bg-transparent p-[10px] text-left text-[12px] text-ink transition-colors duration-150 motion-reduce:transition-none hover:border-l-ink hover:bg-crimson hover:text-paper focus-visible:border-l-ink focus-visible:bg-crimson focus-visible:text-paper [&.active]:border-l-ink [&.active]:bg-crimson [&.active]:font-bold [&.active]:text-paper hover:[&_*]:text-paper focus-visible:[&_*]:text-paper [&.active_*]:text-paper cursor-pointer","data-country":"England Tourism"}, [
                  createElement("span", {"className":"flag w-5 text-[15px]"}, [
                      "🇬🇧"
                  ]),
                  createElement("span", {}, [
                      "England"
                  ]),
                  createElement("b", {"className":"ml-auto font-mono text-[9px]"}, [
                      "UK"
                  ])
              ]),
              createElement("button", {"className":"country-choice flex items-center gap-[11px] rounded-[3px] border-0 border-l-[3px] border-l-transparent bg-transparent p-[10px] text-left text-[12px] text-ink transition-colors duration-150 motion-reduce:transition-none hover:border-l-ink hover:bg-crimson hover:text-paper focus-visible:border-l-ink focus-visible:bg-crimson focus-visible:text-paper [&.active]:border-l-ink [&.active]:bg-crimson [&.active]:font-bold [&.active]:text-paper hover:[&_*]:text-paper focus-visible:[&_*]:text-paper [&.active_*]:text-paper cursor-pointer","data-country":"American Tourism"}, [
                  createElement("span", {"className":"flag w-5 text-[15px]"}, [
                      "🇺🇸"
                  ]),
                  createElement("span", {}, [
                      "United States"
                  ]),
                  createElement("b", {"className":"ml-auto font-mono text-[9px]"}, [
                      "US"
                  ])
              ])
          ]),
          createElement("div", {"className":"sidebar-bottom mt-auto"}, [
              createElement("div", {"className":"data-status flex items-center gap-[10px] border-y border-ink/20 px-[10px] py-[13px]"}, [
                  createElement("span", {"className":"status-dot h-[7px] w-[7px] rounded-full bg-crimson shadow-[0_0_0_4px_rgba(220,20,60,0.12)]"}),
                  createElement("div", {"className":"grid gap-1"}, [
                      createElement("b", {"className":"font-mono text-[8px] tracking-[.11em]"}, [
                          "DATA ENGINE ONLINE"
                      ]),
                      createElement("small", {"className":"text-[10px]"}, [
                          "Browser analytics · v2.0"
                      ])
                  ])
              ]),
              createElement("div", {"className":"creator flex items-center gap-[10px] px-[5px] pt-[17px]"}, [
                  createElement("img", {"alt":"Richardson Tech","className":"h-[39px] w-[39px] rounded-full border border-ink/20 object-cover","src":"/assets/richardson-tech.png"}),
                  createElement("div", {"className":"grid gap-1"}, [
                      createElement("small", {"className":"font-mono text-[7px] tracking-[.11em]"}, [
                          "DESIGNED & ENGINEERED BY"
                      ]),
                      createElement("b", {"className":"font-display text-[11px] font-bold"}, [
                          "Kenny Richardson"
                      ]),
                      createElement("a", {"className":"font-mono text-[8px] text-ink no-underline","href":"https://linkedin.com/in/kennykrichardson","rel":"noreferrer","target":"_blank"}, [
                          "@kennykrichardson ↗"
                      ])
                  ])
              ])
          ])
      ]),
      createElement("main", {"className":"main-content ml-[254px] max-w-[1800px] px-12 max-[1200px]:ml-[225px] max-[1100px]:ml-0 max-[1100px]:w-full max-[1100px]:max-w-none max-[1100px]:px-7 max-[600px]:px-3 text-ink w-auto","id":"overview"}, [
          createElement("header", {"className":"topbar flex h-[72px] items-center justify-between border-b max-[1100px]:h-auto max-[1100px]:min-h-[62px] max-[1100px]:flex-wrap max-[1100px]:gap-[10px] max-[1100px]:py-[10px] max-[600px]:items-center gap-3 border-ink/20"}, [
              createElement("button", {"aria-label":"Open navigation","className":"mobile-menu hidden h-9 w-9 shrink-0 items-center justify-center border-2 border-ink bg-paper text-ink transition-colors motion-reduce:transition-none hover:border-ink hover:bg-crimson hover:text-paper focus-visible:bg-crimson focus-visible:text-paper max-[1100px]:inline-flex cursor-pointer","id":"mobileMenu"}, [
                  "☰"
              ]),
              createElement("div", {"className":"breadcrumb mr-auto font-mono text-[10px] tracking-[.12em] max-[600px]:text-[9px]"}, [
                  "INTELLIGENCE ",
                  createElement("span", {"className":"px-[9px]"}, [
                      "/"
                  ]),
                  createElement("b", {}, [
                      "OVERVIEW"
                  ])
              ]),
              createElement("div", {"className":"topbar-right flex min-w-0 items-center justify-end gap-[10px] max-[1100px]:flex-wrap max-[1100px]:gap-2 max-[600px]:w-full max-[600px]:justify-between max-[600px]:gap-[6px]"}, [
                  createElement("span", {"className":"live-pill shrink-0 inline-flex min-h-9 items-center gap-[9px] whitespace-nowrap border-2 border-ink bg-paper px-[10px] py-2 font-mono text-[8px] tracking-[.1em] max-[600px]:min-h-8 max-[600px]:px-2 max-[600px]:py-[7px] max-[600px]:text-[7px]"}, [
                      createElement("i", {"className":"h-[6px] w-[6px] rounded-full bg-crimson shadow-[0_0_0_3px_rgba(220,20,60,0.12)]"}),
                      " LIVE DATASET"
                  ]),
                  createElement("span", {"className":"date-label shrink-0 whitespace-nowrap font-mono text-[9px] tracking-[.08em] max-[600px]:hidden","id":"todayLabel"}),
                  createElement("button", {"className":"export-btn shrink-0 min-h-9 border-2 border-ink bg-crimson px-[14px] py-[10px] text-[10px] tracking-[.03em] text-paper transition-colors motion-reduce:transition-none hover:border-crimson hover:bg-paper hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson max-[600px]:min-h-8 max-[600px]:px-[9px] max-[600px]:py-[7px] max-[600px]:text-[9px] cursor-pointer","id":"exportBtn"}, [
                      createElement("span", {"className":"export-icon","aria-hidden":"true"}, [
                          "↧"
                      ]),
                      createElement("span", {}, [
                          "Export data"
                      ])
                  ])
              ])
          ]),
          createElement("section", {"className":"hero-section relative my-[25px] h-[370px] overflow-hidden border border-ink bg-paper text-ink max-[600px]:my-[14px] max-[600px]:h-[320px]"}, [
              createElement("div", {"className":"hero-image absolute inset-0"}),
              createElement("div", {"className":"hero-content relative max-w-[700px] px-[55px] py-12 max-[600px]:px-5 max-[600px]:py-[34px]"}, [
                  createElement("div", {"className":"eyebrow flex items-center gap-[9px] font-mono text-[9px] tracking-[.11em]"}, [
                      createElement("span", {"className":"h-px w-[19px] bg-crimson"}),
                      " THE WORLD, IN PERSPECTIVE"
                  ]),
                  createElement("h1", {"className":"mt-[22px] mb-[14px] font-serif text-[clamp(48px,5.7vw,78px)] font-medium leading-[.99] tracking-[-.055em] max-[600px]:text-[clamp(42px,12vw,56px)] max-[360px]:text-[40px]"}, [
                      "Explore beyond",
                      createElement("br", {}),
                      createElement("em", {"className":"font-normal text-ink"}, [
                          "the map."
                      ])
                  ]),
                  createElement("p", {"className":"mb-6 max-w-[430px] text-[13px] leading-[1.8] max-[600px]:max-w-[270px] max-[600px]:text-[11px]"}, [
                      "A considered view of the places people love, the journeys they take, and the signals shaping tomorrow's destinations."
                  ]),
                  createElement("div", {"className":"hero-meta flex flex-wrap items-center gap-3 font-mono text-[8px] tracking-[.11em] max-[600px]:gap-[6px] max-[600px]:text-[7px]"}, [
                      createElement("span", {}, [
                          "04 COUNTRIES"
                      ]),
                      createElement("b", {}, [
                          "·"
                      ]),
                      createElement("span", {}, [
                          "3,834 TRAVEL RECORDS"
                      ]),
                      createElement("b", {}, [
                          "·"
                      ]),
                      createElement("span", {}, [
                          "ONE CONNECTED VIEW"
                      ])
                  ])
              ]),
              createElement("div", {"className":"hero-index absolute right-8 bottom-[27px] grid gap-2 text-right font-mono text-[8px] tracking-[.11em] max-[600px]:right-3 max-[600px]:bottom-3"}, [
                  createElement("span", {}, [
                      "FIELD NOTES"
                  ]),
                  createElement("b", {"className":"font-serif text-[25px] font-medium tracking-[-.04em]"}, [
                      "01",
                      createElement("span", {"className":"px-1"}, [
                          "/"
                      ]),
                      "04"
                  ]),
                  createElement("small", {"className":"text-[7px]"}, [
                      "GLOBAL COLLECTION"
                  ])
              ])
          ]),
          createElement("section", {"aria-label":"Dashboard filters","className":"filter-bar mb-[19px] flex items-center border-2 border-ink border-t-[5px] border-t-crimson bg-paper p-[11px_13px] shadow-[0_8px_24px_rgba(23,23,23,0.10)] max-[1100px]:grid max-[1100px]:grid-cols-4 max-[1100px]:gap-3 max-[1100px]:p-[13px] max-[760px]:grid-cols-2 max-[600px]:gap-[10px] max-[600px]:p-[11px] max-[1100px]:mt-[14px] max-[1100px]:mb-[18px]"}, [
              createElement("div", {"className":"filter-intro flex min-w-[185px] items-center gap-[10px] max-[1100px]:col-span-full max-[1100px]:w-full max-[1100px]:min-w-0 max-[1100px]:border-b max-[1100px]:border-ink/20 max-[1100px]:pb-[10px] max-[1100px]:px-0 p-[0_17px_0_5px]"}, [
                  createElement("span", {"className":"filter-icon font-serif text-[28px]"}, [
                      "⌕"
                  ]),
                  createElement("div", {"className":"grid gap-1"}, [
                      createElement("b", {"className":"font-display text-[11px] font-bold"}, [
                          "Refine your view"
                      ]),
                      createElement("small", {"className":"text-[9px]"}, [
                          "Find the signal within the journey"
                      ])
                  ])
              ]),
              createElement("label", {"className":"filter-control grid min-w-[125px] flex-1 gap-[6px] border-l border-ink/20 px-[15px] max-[1100px]:w-full max-[1100px]:min-w-0 max-[1100px]:border-0 max-[1100px]:px-[5px]"}, [
                  createElement("small", {"className":"font-mono text-[7px] tracking-[.11em] max-[600px]:text-[8px]"}, [
                      "DESTINATION"
                  ]),
                  createElement("select", {"className":"min-h-[38px] w-full max-w-full cursor-pointer rounded-[2px] border-2 border-ink bg-paper px-[9px] py-[7px] text-[12px] font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson max-[600px]:min-h-[42px] max-[600px]:px-[6px] max-[600px]:py-[7px] max-[600px]:text-[11px]","id":"countryFilter"}, [
                      createElement("option", {"className":"bg-paper text-ink","value":"All"}, [
                          "All destinations"
                      ]),
                      createElement("option", {"className":"bg-paper text-ink","value":"Indian Tourism"}, [
                          "India"
                      ]),
                      createElement("option", {"className":"bg-paper text-ink","value":"Japan Tourism"}, [
                          "Japan"
                      ]),
                      createElement("option", {"className":"bg-paper text-ink","value":"England Tourism"}, [
                          "England"
                      ]),
                      createElement("option", {"className":"bg-paper text-ink","value":"American Tourism"}, [
                          "United States"
                      ])
                  ])
              ]),
              createElement("label", {"className":"filter-control grid min-w-[125px] flex-1 gap-[6px] border-l border-ink/20 px-[15px] max-[1100px]:w-full max-[1100px]:min-w-0 max-[1100px]:border-0 max-[1100px]:px-[5px]"}, [
                  createElement("small", {"className":"font-mono text-[7px] tracking-[.11em] max-[600px]:text-[8px]"}, [
                      "LOCATION"
                  ]),
                  createElement("select", {"className":"min-h-[38px] w-full max-w-full cursor-pointer rounded-[2px] border-2 border-ink bg-paper px-[9px] py-[7px] text-[12px] font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson max-[600px]:min-h-[42px] max-[600px]:px-[6px] max-[600px]:py-[7px] max-[600px]:text-[11px]","id":"locationFilter"}, [
                      createElement("option", {"className":"bg-paper text-ink","value":"All"}, [
                          "Everywhere"
                      ])
                  ])
              ]),
              createElement("label", {"className":"filter-control grid min-w-[125px] flex-1 gap-[6px] border-l border-ink/20 px-[15px] max-[1100px]:w-full max-[1100px]:min-w-0 max-[1100px]:border-0 max-[1100px]:px-[5px]"}, [
                  createElement("small", {"className":"font-mono text-[7px] tracking-[.11em] max-[600px]:text-[8px]"}, [
                      "TRAVEL THEME"
                  ]),
                  createElement("select", {"className":"min-h-[38px] w-full max-w-full cursor-pointer rounded-[2px] border-2 border-ink bg-paper px-[9px] py-[7px] text-[12px] font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson max-[600px]:min-h-[42px] max-[600px]:px-[6px] max-[600px]:py-[7px] max-[600px]:text-[11px]","id":"themeFilter"}, [
                      createElement("option", {"className":"bg-paper text-ink","value":"All"}, [
                          "All themes"
                      ])
                  ])
              ]),
              createElement("label", {"className":"filter-control grid min-w-[125px] flex-1 gap-[6px] border-l border-ink/20 px-[15px] max-[1100px]:w-full max-[1100px]:min-w-0 max-[1100px]:border-0 max-[1100px]:px-[5px]"}, [
                  createElement("small", {"className":"font-mono text-[7px] tracking-[.11em] max-[600px]:text-[8px]"}, [
                      "VISITOR TYPE"
                  ]),
                  createElement("select", {"className":"min-h-[38px] w-full max-w-full cursor-pointer rounded-[2px] border-2 border-ink bg-paper px-[9px] py-[7px] text-[12px] font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson max-[600px]:min-h-[42px] max-[600px]:px-[6px] max-[600px]:py-[7px] max-[600px]:text-[11px]","id":"behaviorFilter"}, [
                      createElement("option", {"className":"bg-paper text-ink","value":"All"}, [
                          "All profiles"
                      ])
                  ])
              ]),
              createElement("label", {"className":"search-control flex min-w-[165px] items-center gap-2 border-l border-ink/20 px-[10px] max-[1100px]:col-span-3 max-[1100px]:min-h-10 max-[1100px]:w-full max-[1100px]:min-w-0 max-[1100px]:border-2 max-[1100px]:border-ink max-[1100px]:px-2 max-[760px]:col-span-full max-[600px]:min-h-[42px]"}, [
                  createElement("span", {"className":"text-[20px]"}, [
                      "⌕"
                  ]),
                  createElement("input", {"className":"w-full border-0 bg-transparent text-[10px] text-ink outline-none placeholder:text-ink/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson","id":"searchInput","placeholder":"Search destinations, tags...","type":"search"})
              ]),
              createElement("button", {"className":"reset-btn h-8 w-8 border border-ink/20 bg-transparent text-[17px] hover:bg-crimson hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson max-[1100px]:h-10 max-[1100px]:w-10 max-[1100px]:justify-self-end max-[600px]:col-start-2 cursor-pointer","id":"resetFilters","title":"Reset filters"}, [
                  "↺"
              ])
          ]),
          createElement("section", {"aria-label":"Key metrics","className":"metrics-grid grid grid-cols-4 gap-3 max-[1250px]:grid-cols-2 max-[760px]:grid-cols-2 max-[600px]:gap-2"}, [
              createElement("article", {"className":"metric-card metric-primary relative min-h-[132px] border border-ink bg-paper p-[19px_20px_17px] max-[600px]:min-h-[112px] max-[600px]:px-[11px] max-[600px]:py-[13px]"}, [
                  createElement("div", {"className":"metric-top flex items-center justify-between font-mono text-[8px] tracking-[.11em] max-[600px]:gap-[5px] max-[600px]:text-[7px]"}, [
                      createElement("span", {}, [
                          "DESTINATION RECORDS"
                      ]),
                      createElement("span", {"className":"metric-symbol font-serif text-[19px]"}, [
                          "↗"
                      ])
                  ]),
                  createElement("strong", {"className":"my-[10px] block font-display text-[35px] font-semibold tracking-[-.06em] max-[600px]:text-[clamp(24px,7vw,31px)] max-[360px]:text-[23px]","id":"metricRecords"}, [
                      "—"
                  ]),
                  createElement("div", {"className":"metric-foot flex items-center gap-[7px] text-[9px] max-[600px]:flex-wrap max-[600px]:text-[8px]"}, [
                      createElement("span", {"className":"metric-mark h-[6px] w-[6px] rounded-full bg-crimson"}),
                      " Curated travel observations"
                  ])
              ]),
              createElement("article", {"className":"metric-card relative min-h-[132px] border border-ink bg-paper p-[19px_20px_17px] max-[600px]:min-h-[112px] max-[600px]:px-[11px] max-[600px]:py-[13px]"}, [
                  createElement("div", {"className":"metric-top flex items-center justify-between font-mono text-[8px] tracking-[.11em] max-[600px]:gap-[5px] max-[600px]:text-[7px]"}, [
                      createElement("span", {}, [
                          "COLLECTIVE APPRECIATION"
                      ]),
                      createElement("span", {"className":"metric-symbol font-serif text-[19px]"}, [
                          "♡"
                      ])
                  ]),
                  createElement("strong", {"className":"my-[10px] block font-display text-[35px] font-semibold tracking-[-.06em] max-[600px]:text-[clamp(24px,7vw,31px)] max-[360px]:text-[23px]","id":"metricFaves"}, [
                      "—"
                  ]),
                  createElement("div", {"className":"metric-foot flex items-center gap-[7px] text-[9px] max-[600px]:flex-wrap max-[600px]:text-[8px]"}, [
                      "Total recorded favourites"
                  ])
              ]),
              createElement("article", {"className":"metric-card relative min-h-[132px] border border-ink bg-paper p-[19px_20px_17px] max-[600px]:min-h-[112px] max-[600px]:px-[11px] max-[600px]:py-[13px]"}, [
                  createElement("div", {"className":"metric-top flex items-center justify-between font-mono text-[8px] tracking-[.11em] max-[600px]:gap-[5px] max-[600px]:text-[7px]"}, [
                      createElement("span", {}, [
                          "AVERAGE SENTIMENT"
                      ]),
                      createElement("span", {"className":"metric-symbol font-serif text-[19px]"}, [
                          "✳"
                      ])
                  ]),
                  createElement("strong", {"className":"my-[10px] block font-display text-[35px] font-semibold tracking-[-.06em] max-[600px]:text-[clamp(24px,7vw,31px)] max-[360px]:text-[23px]","id":"metricSentiment"}, [
                      "—"
                  ]),
                  createElement("div", {"className":"metric-foot flex items-center gap-[7px] text-[9px] max-[600px]:flex-wrap max-[600px]:text-[8px]"}, [
                      createElement("span", {"className":"sentiment-track inline-block h-[3px] w-[65px] bg-ink/10"}, [
                          createElement("i", {"className":"block h-full w-0 bg-crimson","id":"sentimentBar"})
                      ]),
                      " Out of 100"
                  ])
              ]),
              createElement("article", {"className":"metric-card relative min-h-[132px] border border-ink bg-paper p-[19px_20px_17px] max-[600px]:min-h-[112px] max-[600px]:px-[11px] max-[600px]:py-[13px]"}, [
                  createElement("div", {"className":"metric-top flex items-center justify-between font-mono text-[8px] tracking-[.11em] max-[600px]:gap-[5px] max-[600px]:text-[7px]"}, [
                      createElement("span", {}, [
                          "DESTINATIONS MAPPED"
                      ]),
                      createElement("span", {"className":"metric-symbol font-serif text-[19px]"}, [
                          "⌖"
                      ])
                  ]),
                  createElement("strong", {"className":"my-[10px] block font-display text-[35px] font-semibold tracking-[-.06em] max-[600px]:text-[clamp(24px,7vw,31px)] max-[360px]:text-[23px]","id":"metricLocations"}, [
                      "—"
                  ]),
                  createElement("div", {"className":"metric-foot flex items-center gap-[7px] text-[9px] max-[600px]:flex-wrap max-[600px]:text-[8px]"}, [
                      "Distinct location signals"
                  ])
              ])
          ]),
          createElement("section", {"className":"section-heading mt-[57px] mb-[18px] flex items-end justify-between max-[600px]:mt-[38px] max-[600px]:mb-[14px] max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-[10px]","id":"explore"}, [
              createElement("div", {}, [
                  createElement("div", {"className":"eyebrow dark-eyebrow flex items-center gap-[9px] font-mono text-[9px] tracking-[.11em] text-ink"}, [
                      "01 — GEOGRAPHIC INTELLIGENCE"
                  ]),
                  createElement("h2", {"className":"mt-[10px] mb-[7px] font-serif text-[37px] font-medium leading-[1.1] tracking-[-.045em] max-[600px]:text-[31px]"}, [
                      "Where the world ",
                      createElement("em", {"className":"font-normal text-ink"}, [
                          "gathers."
                      ])
                  ]),
                  createElement("p", {"className":"m-0 text-[11px] leading-[1.7]"}, [
                      "Explore the geography behind the attention. Select a country to focus the map."
                  ])
              ]),
              createElement("div", {"className":"map-legend flex gap-[18px] pb-[5px] text-[9px] max-[600px]:flex-wrap max-[600px]:gap-[10px] max-[600px]:text-[8px]"}, [
                  createElement("span", {"className":"flex items-center gap-[7px]"}, [
                      createElement("i", {"className":"legend-dot large h-2 w-2 rounded-full bg-crimson shadow-[0_0_0_4px_rgba(220,20,60,0.12)] h-[11px] w-[11px]"}),
                      " High attention"
                  ]),
                  createElement("span", {"className":"flex items-center gap-[7px]"}, [
                      createElement("i", {"className":"legend-dot h-2 w-2 rounded-full bg-crimson shadow-[0_0_0_4px_rgba(220,20,60,0.12)]"}),
                      " Emerging signal"
                  ])
              ])
          ]),
          createElement("section", {"className":"map-panel border border-ink bg-paper px-[17px] pb-[13px] max-[600px]:px-[9px] max-[600px]:pb-[10px]"}, [
              createElement("div", {"className":"map-toolbar flex h-[59px] items-center justify-between border-b border-ink/20 max-[600px]:h-auto max-[600px]:min-h-[58px] max-[600px]:flex-wrap max-[600px]:gap-2 max-[600px]:py-[10px]"}, [
                  createElement("div", {"className":"grid gap-1"}, [
                      createElement("b", {"className":"font-display text-[11px] font-bold max-[600px]:text-[10px]","id":"mapTitle"}, [
                          "Global destination atlas"
                      ]),
                      createElement("small", {"className":"text-[9px] max-[600px]:text-[8px]","id":"mapSubtitle"}, [
                          "Four collections · Interactive geographic view"
                      ])
                  ]),
                  createElement("div", {"className":"map-actions flex items-center gap-[15px] max-[600px]:gap-[7px]"}, [
                      createElement("span", {"className":"map-live flex items-center gap-[7px] font-mono text-[8px] tracking-[.08em] max-[600px]:hidden"}, [
                          createElement("i", {"className":"h-[6px] w-[6px] rounded-full bg-crimson shadow-[0_0_0_3px_rgba(220,20,60,0.12)]"}),
                          " MAP ACTIVE"
                      ]),
                      createElement("button", {"className":"border-2 border-ink bg-paper px-[10px] py-[7px] text-[9px] transition-colors motion-reduce:transition-none hover:bg-crimson hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson max-[600px]:px-2 max-[600px]:text-[8px] cursor-pointer","id":"fitMap"}, [
                          "⌖ Fit view"
                      ])
                  ])
              ]),
              createElement("div", {"aria-label":"Interactive map showing tourism destination locations","className":"tourism-map relative z-[1] h-[425px] bg-paper max-[1100px]:h-[390px] max-[760px]:h-[340px] max-[600px]:h-[310px] max-[360px]:h-[280px]","id":"tourismMap","role":"application"}),
              createElement("div", {"className":"map-footer flex items-center justify-between gap-3 pt-3 max-[600px]:flex-wrap max-[600px]:gap-2"}, [
                  createElement("div", {"className":"grid gap-[5px]"}, [
                      createElement("span", {"className":"map-coord font-mono text-[8px] tracking-[.11em]","id":"mapCoordinates"}, [
                          "GLOBAL VIEW · 20° N / 20° E"
                      ]),
                      createElement("span", {"className":"text-[9px]","id":"mapFootnote"}, [
                          "Select a marker to inspect destination activity"
                      ])
                  ]),
                  createElement("div", {"className":"map-scale flex items-center gap-2 font-mono text-[8px] tracking-[.11em] max-[600px]:text-[7px]"}, [
                      createElement("span", {}, [
                          "LOW"
                      ]),
                      createElement("i", {"className":"h-1 w-[75px] bg-crimson max-[600px]:w-10"}),
                      createElement("span", {}, [
                          "HIGH ATTENTION"
                      ])
                  ])
              ])
          ]),
          createElement("section", {"className":"analysis-grid mt-[15px] grid grid-cols-[1.25fr_.85fr] gap-[14px] max-[1100px]:grid-cols-[minmax(0,1.2fr)_minmax(260px,.8fr)] max-[760px]:mt-[10px] max-[760px]:grid-cols-1 max-[760px]:gap-[10px]","id":"signals"}, [
              createElement("article", {"className":"panel chart-panel border border-ink bg-paper p-[22px_23px] max-[600px]:px-3 max-[600px]:py-4"}, [
                  createElement("div", {"className":"panel-heading flex items-start justify-between gap-2 max-[600px]:gap-2"}, [
                      createElement("div", {}, [
                          createElement("div", {"className":"eyebrow dark-eyebrow flex items-center gap-[9px] font-mono text-[9px] tracking-[.11em] text-ink"}, [
                              "02 — DESTINATION RANKING"
                          ]),
                          createElement("h3", {"className":"my-[9px] mb-[5px] font-serif text-[25px] font-medium tracking-[-.035em] max-[600px]:text-[22px]"}, [
                              "Places in focus"
                          ]),
                          createElement("p", {"className":"m-0 text-[11px] leading-[1.7] text-[10px] max-[600px]:text-[9px]"}, [
                              "Where the most travel records are concentrated."
                          ])
                      ]),
                      createElement("span", {"className":"panel-index border border-ink/20 px-[9px] py-[7px] font-mono text-[9px] max-[600px]:p-[6px] max-[600px]:text-[8px]"}, [
                          "A / 04"
                      ])
                  ]),
                  createElement("div", {"className":"chart-wrap mt-[18px] h-[255px] max-[600px]:mt-3 max-[600px]:h-[220px]"}, [
                      createElement("canvas", {"aria-label":"Destination attention ranking chart","id":"attentionChart"})
                  ]),
                  createElement("div", {"className":"panel-note mt-[9px] flex justify-between border-t border-ink/20 pt-[11px] font-mono text-[8px] tracking-[.11em]"}, [
                      "RANKED BY RECORD VOLUME ",
                      createElement("span", {"className":"text-[13px]"}, [
                          "↗"
                      ])
                  ])
              ]),
              createElement("article", {"className":"panel theme-panel border border-ink bg-paper p-[22px_23px] max-[600px]:px-3 max-[600px]:py-4"}, [
                  createElement("div", {"className":"panel-heading flex items-start justify-between gap-2 max-[600px]:gap-2"}, [
                      createElement("div", {}, [
                          createElement("div", {"className":"eyebrow dark-eyebrow flex items-center gap-[9px] font-mono text-[9px] tracking-[.11em] text-ink"}, [
                              "03 — TRAVEL INTEREST"
                          ]),
                          createElement("h3", {"className":"my-[9px] mb-[5px] font-serif text-[25px] font-medium tracking-[-.035em] max-[600px]:text-[22px]"}, [
                              "Themes that move us"
                          ]),
                          createElement("p", {"className":"m-0 text-[11px] leading-[1.7] text-[10px] max-[600px]:text-[9px]"}, [
                              "What draws travellers into the world."
                          ])
                      ]),
                      createElement("span", {"className":"panel-index border border-ink/20 px-[9px] py-[7px] font-mono text-[9px] max-[600px]:p-[6px] max-[600px]:text-[8px]"}, [
                          "B / 04"
                      ])
                  ]),
                  createElement("div", {"className":"theme-list my-6 grid gap-[14px]","id":"themeList"}),
                  createElement("div", {"className":"panel-note mt-[9px] flex justify-between border-t border-ink/20 pt-[11px] font-mono text-[8px] tracking-[.11em]"}, [
                      "MOST FREQUENT THEMES ",
                      createElement("span", {"className":"text-[13px]"}, [
                          "↗"
                      ])
                  ])
              ])
          ]),
          createElement("section", {"className":"section-heading compact-heading mt-[57px] mb-[18px] flex items-end justify-between max-[600px]:mt-[38px] max-[600px]:mb-[14px] max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-[10px]","id":"segments"}, [
              createElement("div", {}, [
                  createElement("div", {"className":"eyebrow dark-eyebrow flex items-center gap-[9px] font-mono text-[9px] tracking-[.11em] text-ink"}, [
                      "04 — HUMAN PATTERNS"
                  ]),
                  createElement("h2", {"className":"mt-[10px] mb-[7px] font-serif text-[37px] font-medium leading-[1.1] tracking-[-.045em] max-[600px]:text-[31px]"}, [
                      "Every traveller has a ",
                      createElement("em", {"className":"font-normal text-ink"}, [
                          "story."
                      ])
                  ]),
                  createElement("p", {"className":"m-0 text-[11px] leading-[1.7]"}, [
                      "Behavioural signals reveal the different ways people experience a place."
                  ])
              ]),
              createElement("div", {"className":"section-aside text-right font-mono text-[8px] leading-[1.8] tracking-[.11em] max-[600px]:hidden"}, [
                  "A CLOSER LOOK AT",
                  createElement("br", {}),
                  createElement("b", {"className":"text-[10px]"}, [
                      "VISITOR PROFILES"
                  ])
              ])
          ]),
          createElement("section", {"className":"behavior-grid grid grid-cols-4 gap-3 max-[1250px]:grid-cols-2 max-[1100px]:grid-cols-2 max-[600px]:gap-2","id":"behaviorGrid"}),
          createElement("section", {"className":"lower-grid mt-[57px] grid grid-cols-[minmax(0,1.55fr)_minmax(270px,.75fr)] items-stretch gap-4 max-[1100px]:grid-cols-[minmax(0,1.35fr)_minmax(250px,.85fr)] max-[760px]:mt-[43px] max-[760px]:grid-cols-1 max-[600px]:mt-[38px] max-[600px]:gap-[10px]"}, [
              createElement("article", {"className":"panel feed-panel border border-ink bg-paper p-[22px_23px] max-[600px]:px-3 max-[600px]:py-4 relative overflow-hidden border-2 border-t-[6px] border-t-crimson p-[24px_25px_22px] shadow-[0_12px_30px_rgba(23,23,23,0.07)] max-[600px]:p-[20px_16px]"}, [
                  createElement("div", {"className":"panel-heading feed-heading flex items-start justify-between gap-2 max-[600px]:gap-2 relative items-center border-b border-ink/20 pb-[17px]"}, [
                      createElement("div", {}, [
                          createElement("div", {"className":"eyebrow dark-eyebrow flex items-center gap-[9px] font-mono text-[9px] tracking-[.11em] text-ink"}, [
                              "05 — THE TRAVEL JOURNAL"
                          ]),
                          createElement("h3", {"className":"my-[9px] mb-[5px] font-serif text-[25px] font-medium tracking-[-.035em] max-[600px]:text-[22px] mt-[10px] mb-[6px] text-[30px] max-[600px]:text-[25px]"}, [
                              "Signals from the field"
                          ]),
                          createElement("p", {"className":"m-0 text-[11px] leading-[1.7] text-[10px] max-[600px]:text-[9px]"}, [
                              "A rolling dispatch of high-engagement travel records."
                          ])
                      ]),
                      createElement("span", {"className":"live-pill feed-live-pill inline-flex min-h-9 items-center gap-[9px] whitespace-nowrap border-2 border-ink bg-paper px-[10px] py-2 font-mono text-[8px] tracking-[.1em] max-[600px]:min-h-8 max-[600px]:px-2 max-[600px]:py-[7px] max-[600px]:text-[7px] bg-crimson px-[13px] py-[10px] font-bold"}, [
                          createElement("i", {"className":"h-[6px] w-[6px] rounded-full bg-crimson shadow-[0_0_0_3px_rgba(220,20,60,0.12)] bg-paper shadow-[0_0_0_4px_rgba(255,253,246,0.25)]"}),
                          " LIVE FEED"
                      ])
                  ]),
                  createElement("div", {"className":"feed-overview my-[17px] mb-2 grid grid-cols-[1.2fr_.8fr_.8fr_1.1fr] items-center gap-3 border border-crimson/25 bg-crimson/[.055] px-[15px] py-[13px] max-[1100px]:grid-cols-2 max-[1100px]:[&_.feed-overview-note]:hidden max-[600px]:px-[11px] max-[600px]:py-[11px]"}, [
                      createElement("div", {"className":"feed-overview-label grid grid-cols-[9px_1fr] items-center gap-x-2"}, [
                          createElement("span", {"className":"feed-pulse h-[7px] w-[7px] rounded-full bg-crimson shadow-[0_0_0_4px_rgba(220,20,60,0.13)] animate-[feed-pulse_1.8s_ease-out_infinite] motion-reduce:animate-none"}),
                          createElement("b", {"className":"font-display text-[9px] font-extrabold tracking-[.1em]"}, [
                              "STREAM MONITOR"
                          ]),
                          createElement("small", {"className":"col-start-2 mt-1 font-mono text-[7px] tracking-[.1em] opacity-70"}, [
                              "COLLECTION ACTIVITY"
                          ])
                      ]),
                      createElement("div", {"className":"feed-overview-stat grid gap-[3px] border-l border-ink/20 pl-[13px] max-[600px]:border-l-0 max-[600px]:pl-0"}, [
                          createElement("strong", {"className":"font-display text-[22px] font-bold tracking-[-.05em]","id":"feedTotal"}, [
                              "—"
                          ]),
                          createElement("span", {"className":"font-mono text-[7px] tracking-[.08em]"}, [
                              "RECORDS IN VIEW"
                          ])
                      ]),
                      createElement("div", {"className":"feed-overview-stat grid gap-[3px] border-l border-ink/20 pl-[13px] max-[600px]:border-l-0 max-[600px]:pl-0"}, [
                          createElement("strong", {"className":"font-display text-[22px] font-bold tracking-[-.05em]"}, [
                              "1.2",
                              createElement("span", {"className":"text-xs"}, [
                                  "s"
                              ])
                          ]),
                          createElement("span", {"className":"font-mono text-[7px] tracking-[.08em]"}, [
                              "UPDATE CADENCE"
                          ])
                      ]),
                      createElement("div", {"className":"feed-overview-note border-l border-ink/20 pl-[13px] text-[9px] leading-[1.55]"}, [
                          "Signals rotate automatically",
                          createElement("br", {}),
                          "across distinct destinations."
                      ])
                  ]),
                  createElement("div", {"aria-live":"polite","aria-relevant":"additions","className":"live-feed mt-[9px] grid grid-cols-2 gap-x-[18px] max-[600px]:grid-cols-1 max-[600px]:gap-0","id":"liveFeed"})
              ]),
              createElement("article", {"className":"panel insight-panel border border-ink bg-paper p-[22px_23px] max-[600px]:px-3 max-[600px]:py-4 min-h-[370px]"}, [
                  createElement("div", {"className":"eyebrow dark-eyebrow flex items-center gap-[9px] font-mono text-[9px] tracking-[.11em] text-ink"}, [
                      "06 — EDITOR'S OBSERVATIONS"
                  ]),
                  createElement("h3", {"className":"my-3 mb-[17px] font-serif text-[28px] font-medium tracking-[-.035em]"}, [
                      "What the data ",
                      createElement("em", {"className":"font-normal text-ink"}, [
                          "suggests."
                      ])
                  ]),
                  createElement("div", {"className":"insight-list grid","id":"insightList"}),
                  createElement("div", {"className":"method-note mt-[15px] bg-paper p-3"}, [
                      createElement("b", {"className":"font-mono text-[8px] tracking-[.1em]"}, [
                          "ABOUT THESE SIGNALS"
                      ]),
                      createElement("p", {"className":"mt-[6px] text-[9px] leading-[1.6]"}, [
                          "Insights describe patterns in the bundled dataset. Forecasts and high-engagement flags are heuristic indicators, not validated predictions."
                      ])
                  ])
              ])
          ]),
          createElement("footer", {"className":"footer mt-[58px] flex items-center justify-between gap-[15px] border-t border-ink/20 py-5 pb-[23px] max-[600px]:mt-[35px] max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-[9px]"}, [
              createElement("a", {"className":"footer-brand font-display text-[13px] font-extrabold tracking-[.17em] text-ink no-underline","href":"#overview"}, [
                  "GEOTRAIL",
                  createElement("span", {"className":"pl-1 text-crimson"}, [
                      "✳"
                  ])
              ]),
              createElement("span", {"className":"font-mono text-[8px] tracking-[.11em]"}, [
                  "EXPLORE BEYOND THE MAP."
              ]),
              createElement("div", {"className":"font-mono text-[8px] tracking-[.11em]"}, [
                  "ENGINEERED WITH INTENT BY ",
                  createElement("a", {"className":"font-bold text-ink no-underline","href":"https://linkedin.com/in/kennykrichardson","rel":"noreferrer","target":"_blank"}, [
                      "KENNY RICHARDSON ↗"
                  ])
              ])
          ])
      ])
  ]),
  createElement("div", {"aria-live":"polite","className":"toast pointer-events-none fixed right-[25px] bottom-[25px] z-[500] translate-y-[10px] border-2 border-ink bg-crimson px-[18px] py-[13px] text-[11px] text-paper opacity-0 transition-all duration-200 [&.show]:translate-y-0 [&.show]:opacity-100 max-[600px]:right-3 max-[600px]:bottom-3 max-[600px]:left-3 max-[600px]:text-center","id":"toast","role":"status"})
  ]);
  document.body.replaceChildren(appRoot);
}

mountApp();

const DATA_URL = '/data/tourism-records.json';
const COUNTRY_META = {
  'Indian Tourism': { label:'India', flag:'🇮🇳', center:[22.5,79], zoom:4.6, bounds:[[6,67],[37,98]] },
  'Japan Tourism': { label:'Japan', flag:'🇯🇵', center:[36.2,138], zoom:5, bounds:[[24,122],[46,146]] },
  'England Tourism': { label:'England', flag:'🇬🇧', center:[52.8,-1.8], zoom:6, bounds:[[49.7,-6.5],[55.9,2.2]] },
  'American Tourism': { label:'United States', flag:'🇺🇸', center:[39,-98], zoom:3.7, bounds:[[24,-126],[50, -66]] }
};
// Coordinates are explicit geographic anchors for the location labels in the bundled dataset.
const GEO = {
  'India Tourism Signal':[22.5,79], 'Andhra Pradesh':[15.9,79.7], 'Arunachal Pradesh':[28.2,94.7], Assam:[26.2,92.9], Bihar:[25.9,85.3], Goa:[15.3,74], Gujarat:[22.3,71.7], 'Himachal Pradesh':[31.1,77.2], Karnataka:[15.3,75.7], Kerala:[10.5,76.2], 'Madhya Pradesh':[23.5,78.5], Maharashtra:[19.7,75.7], Meghalaya:[25.5,91.3], Odisha:[20.9,84.5], Punjab:[31,75.3], Rajasthan:[26.8,73.8], Sikkim:[27.5,88.5], 'Tamil Nadu':[11.1,78.7], Telangana:[17.9,79.1], 'Uttar Pradesh':[27,80.8], Uttarakhand:[30.1,79], 'West Bengal':[23.5,87.8],
  Tokyo:[35.6762,139.6503], Kyoto:[35.0116,135.7681], Osaka:[34.6937,135.5023], Nara:[34.6851,135.8048], Nagoya:[35.1815,136.9066], Okinawa:[26.2124,127.6809], Sapporo:[43.0618,141.3545], Hakone:[35.2324,139.1069], Yokohama:[35.4437,139.638], Hiroshima:[34.3853,132.4553], 'Mount Fuji':[35.3606,138.7274], Fukuoka:[33.5904,130.4017], Sendai:[38.2682,140.8694],
  London:[51.5072,-.1276], Manchester:[53.4808,-2.2426], Liverpool:[53.4084,-2.9916], Birmingham:[52.4862,-1.8904], Bath:[51.3811,-2.359], Oxford:[51.752,-1.2577], Cambridge:[52.2053,.1218], Brighton:[50.8225,-.1372], Cornwall:[50.266,-5.0527], 'Lake District':[54.4609,-3.0886], Newcastle:[54.9783,-1.6178], York:[53.959,-1.0815], Bristol:[51.4545,-2.5879], Leeds:[53.8008,-1.5491], Nottingham:[52.9548,-1.1581], 'British Museum':[51.5194,-.127], 'Tower Bridge':[51.5055,-.0754],
  California:[36.7783,-119.4179], Utah:[39.321,-111.0937], Arizona:[34.0489,-111.0937], Florida:[27.6648,-81.5158], Brooklyn:[40.6782,-73.9442], Central:[39.5,-98.35], Empire:[40.7484,-73.9857], Nevada:[38.8026,-116.4194], Mount:[37.8651,-119.5383], Niagara:[43.0962,-79.0377], Colorado:[39.5501,-105.7821], Washington:[47.7511,-120.7401], Statue:[40.6892,-74.0445], Times:[40.758,-73.9855], Wyoming:[43.076,-107.2903]
};
const $ = id => document.getElementById(id);
const state = { dataset:'All', location:'All', theme:'All', behavior:'All', search:'' };
let records=[], map, markerLayer, chart, toastTimer;
let streamTimer=null, streamIndex=0, feedRows=[];
const fmt = n => Number(n||0).toLocaleString('en-US');
const avg = (rows,key) => rows.length ? rows.reduce((s,r)=>s+Number(r[key]||0),0)/rows.length : 0;
const escapeHTML = s => String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function notify(message){const el=$('toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2300)}
function countryLabel(ds){return COUNTRY_META[ds]?.label||'Global'}
function filteredRows(){return records.filter(r=>(state.dataset==='All'||r.dataset===state.dataset)&&(state.location==='All'||r.location===state.location)&&(state.theme==='All'||r.theme===state.theme)&&(state.behavior==='All'||r.behavior===state.behavior)&&(!state.search||[r.title,r.description,r.location,r.theme,r.behavior,r.dataset,...(r.tags||[])].join(' ').toLowerCase().includes(state.search.toLowerCase())))}
function groupBy(rows,key){const m=new Map();rows.forEach(r=>{const k=r[key]||'Unclassified';m.set(k,(m.get(k)||[]).concat(r))});return [...m].map(([name,items])=>({name,items,count:items.length,avgFaves:avg(items,'faves'),avgSentiment:avg(items,'sentiment')})).sort((a,b)=>b.count-a.count)}
function fillSelect(id, values, placeholder) {
  const element = $(id), previous = element.value;
  const options = [createElement('option', { value: 'All' }, [placeholder]),
    ...values.map(value => createElement('option', { value }, [value]))];
  element.replaceChildren(...options);
  element.value = values.includes(previous) ? previous : 'All';
}
function refreshOptions(){const base=records.filter(r=>state.dataset==='All'||r.dataset===state.dataset);fillSelect('locationFilter',[...new Set(base.map(r=>r.location))].sort(),'Everywhere');fillSelect('themeFilter',[...new Set(base.map(r=>r.theme))].sort(),'All themes');fillSelect('behaviorFilter',[...new Set(base.map(r=>r.behavior))].sort(),'All profiles');$('locationFilter').value=state.location;$('themeFilter').value=state.theme;$('behaviorFilter').value=state.behavior}
function initMap(){map=L.map('tourismMap',{scrollWheelZoom:false,zoomControl:true,worldCopyJump:true}).setView([24,35],2);L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors'}).addTo(map);markerLayer=L.layerGroup().addTo(map);map.on('click',e=>$('mapCoordinates').textContent=`${e.latlng.lat.toFixed(3)}° / ${e.latlng.lng.toFixed(3)}°`)}
function drawMap(rows){markerLayer.clearLayers();const groups=groupBy(rows,'location');const mapped=groups.map(g=>({...g,coords:GEO[g.name]})).filter(g=>g.coords);groups.filter(g=>!g.coords).forEach(g=>console.warn('No map coordinate configured for location:',g.name));const max=Math.max(1,...mapped.map(g=>g.count));mapped.forEach(g=>{const size=9+Math.round(g.count/max*10);const icon=L.divIcon({className:'',html:`<span class="map-marker grid place-items-center rounded-full border border-crimson/60 bg-crimson/15" style="width:${size+12}px;height:${size+12}px"><i class="block h-[7px] w-[7px] rounded-full bg-crimson shadow-[0_0_0_3px_rgba(220,20,60,0.18)]"></i></span>`,iconSize:[size+12,size+12],iconAnchor:[(size+12)/2,(size+12)/2]});const marker=L.marker(g.coords,{icon}).bindPopup(`<div class="map-popup min-w-[160px] font-sans text-ink"><b class="mb-[5px] block font-display text-[13px] font-bold">${escapeHTML(g.name)}</b><span class="text-[10px]">${fmt(g.count)} travel records · ${fmt(Math.round(g.items.reduce((s,r)=>s+Number(r.faves||0),0)))} favourites</span><small class="mt-2 block font-mono text-[8px]">${escapeHTML(countryLabel(g.items[0].dataset).toUpperCase())} · ${g.avgSentiment.toFixed(1)} SENTIMENT</small></div>`);marker.addTo(markerLayer);marker.on('click',()=>{$('mapCoordinates').textContent=`${g.coords[0].toFixed(3)}° / ${g.coords[1].toFixed(3)}°`;$('mapFootnote').textContent=`${g.name} · ${fmt(g.count)} records · ${g.avgSentiment.toFixed(1)} average sentiment`})});const datasets=state.dataset==='All'?Object.keys(COUNTRY_META):[state.dataset];if(state.dataset==='All'){map.setView([27,35],2,{animate:true});$('mapTitle').textContent='Global destination atlas';$('mapSubtitle').textContent=`${mapped.length} mapped location signals · Four country collections`;$('mapCoordinates').textContent='GLOBAL VIEW · 27° N / 35° E'}else{const meta=COUNTRY_META[state.dataset];map.fitBounds(meta.bounds,{padding:[20,20],maxZoom:meta.zoom+1,animate:true});$('mapTitle').textContent=`${meta.label} destination atlas`;$('mapSubtitle').textContent=`${mapped.length} mapped location signals · ${meta.flag} ${meta.label}`;$('mapCoordinates').textContent=`${meta.label.toUpperCase()} · ${meta.center[0].toFixed(1)}° / ${meta.center[1].toFixed(1)}°`}$('mapFootnote').textContent='Select a marker to inspect destination activity';setTimeout(()=>map.invalidateSize(),100)}
function drawChart(groups){const data=groups.slice(0,9);if(chart)chart.destroy();chart=new Chart($('attentionChart'),{type:'bar',data:{labels:data.map(x=>x.name),datasets:[{data:data.map(x=>x.count),backgroundColor:data.map((_,i)=>i===0?'#DC143C':'#DC143C'),borderRadius:2,borderSkipped:false,maxBarThickness:25}]},options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{backgroundColor:'#171717',titleColor:'#FFFDF6',bodyColor:'#FFFDF6',padding:11,displayColors:false,callbacks:{label:c=>`${fmt(c.raw)} records`}}},scales:{x:{beginAtZero:true,grid:{color:'rgba(23,23,23,.08)'},ticks:{color:'#171717',font:{family:'DM Mono',size:9}}},y:{grid:{display:false},ticks:{color:'#171717',font:{family:'DM Sans',size:10}}}}}})}
function drawThemes(groups) {
  const host = $('themeList');
  const rows = groups.slice(0, 7).map(group => {
    const label = createElement('label', { className: 'overflow-hidden text-ellipsis whitespace-nowrap text-[10px] font-semibold max-[600px]:text-[9px]', title: group.name }, [group.name]);
    const track = createElement('div', { className: 'h-[5px] bg-ink/10' }, [
      createElement('i', { className: 'block h-full bg-crimson' })
    ]);
    track.firstElementChild.style.width = `${Math.max(2, group.count / (groups[0]?.count || 1) * 100)}%`;
    return createElement('div', { className: 'theme-row grid grid-cols-[105px_minmax(0,1fr)_35px] items-center gap-[10px] max-[600px]:grid-cols-[minmax(75px,100px)_minmax(30px,1fr)_30px] max-[600px]:gap-[7px]' }, [
      label, track, createElement('b', { className: 'text-right font-mono text-[10px]' }, [fmt(group.count)])
    ]);
  });
  host.replaceChildren(...(rows.length ? rows : [createElement('div', { className: 'empty-state p-[30px] text-center text-[11px]' }, ['No theme signals in this selection.'])]));
}
function drawBehaviors(groups, total) {
  const host = $('behaviorGrid');
  const cards = groups.slice(0, 8).map((group, index) => {
    const card = createElement('article', {
      className: 'behavior-card relative min-h-[155px] cursor-pointer border border-ink bg-paper p-[18px] transition-colors hover:bg-crimson/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson max-[600px]:min-h-[138px] max-[600px]:p-3',
      tabindex: '0', role: 'button'
    }, [
      createElement('span', { className: 'font-mono text-[10px]' }, [`PROFILE / 0${index + 1}`]),
      createElement('strong', { className: 'absolute top-4 right-[17px] font-display text-[18px] font-bold max-[600px]:top-[10px] max-[600px]:right-[10px] max-[600px]:text-[14px]' }, [`${Math.round(group.count / Math.max(total, 1) * 100)}%`]),
      createElement('h4', { className: 'mt-4 mb-[7px] font-serif text-[19px] font-medium max-[600px]:mt-[13px] max-[600px]:mb-[6px] max-[600px]:text-base' }, [group.name]),
      createElement('p', { className: 'm-0 text-[9px] leading-[1.6] max-[600px]:text-[8px]' }, [`${fmt(group.count)} records · ${group.avgSentiment.toFixed(1)} sentiment average`])
    ]);
    card.dataset.behavior = group.name;
    return card;
  });
  host.replaceChildren(...(cards.length ? cards : [createElement('div', { className: 'empty-state p-[30px] text-center text-[11px]' }, ['No visitor profiles match the current filters.'])]));
  cards.forEach(card => {
    const apply = () => { state.behavior = card.dataset.behavior; $('behaviorFilter').value = state.behavior; render(); };
    card.addEventListener('click', apply);
    card.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); apply(); } });
  });
}
function pushStreamItem(record) {
  const host = $('liveFeed');
  if (!host) return;
  const number = String((streamIndex % Math.max(feedRows.length, 1)) + 1).padStart(2, '0');
  const node = createElement('div', { className: 'feed-item feed-item-new relative grid min-h-[72px] grid-cols-[29px_minmax(0,1fr)_auto] items-center gap-[9px] border-t border-ink/15 px-[10px] py-[13px] pl-[3px] transition-[background,transform] duration-200 motion-reduce:transition-none hover:translate-x-[2px] hover:bg-crimson/[.045] animate-[feed-arrive_.42s_ease_both] motion-reduce:animate-none max-[600px]:grid-cols-[27px_minmax(0,1fr)_auto] max-[600px]:gap-[7px] max-[600px]:px-0 max-[600px]:py-[11px]' }, [
    createElement('span', { className: 'feed-number font-mono text-[10px] font-bold text-crimson' }, [number]),
    createElement('div', { className: 'feed-copy min-w-0' }, [
      createElement('b', { className: 'line-clamp-2 block text-[10px] font-bold leading-[1.45]' }, [record.title || record.location || 'New tourism signal']),
      createElement('small', { className: 'mt-1 block text-[8px] leading-[1.5] max-[600px]:whitespace-normal' }, [`${record.location || 'Unclassified'} · ${record.theme || 'General'} · ${countryLabel(record.dataset)}`])
    ]),
    createElement('span', { className: 'feed-score whitespace-nowrap border border-ink/20 bg-paper/80 px-[7px] py-[5px] font-mono text-[9px]' }, [`♡ ${fmt(Math.round(record.faves || 0))}`])
  ]);
  host.prepend(node);
  while (host.children.length > 8) host.lastElementChild.remove();
}
function drawFeed(rows){
  if(streamTimer){clearInterval(streamTimer);streamTimer=null;}
  streamIndex=0;
  const host=$('liveFeed');
  const buckets=new Map();

  // Interleave records by destination so the live stream keeps surfacing
  // different locations instead of exhausting one location at a time.
  rows.forEach(record=>{
    const location=record.location||'Unclassified';
    if(!buckets.has(location))buckets.set(location,[]);
    buckets.get(location).push(record);
  });

  const locations=[...buckets.values()];
  locations.forEach(list=>list.sort((a,b)=>Number(b.faves||0)-Number(a.faves||0)));
  feedRows=[];
  const longest=Math.max(0,...locations.map(list=>list.length));
  for(let index=0;index<longest;index++){
    locations.forEach(list=>{if(list[index])feedRows.push(list[index]);});
  }

  const totalLabel=$('feedTotal');
  if(totalLabel)totalLabel.textContent=fmt(feedRows.length);
  if(!host)return;
  host.replaceChildren();
  if (!feedRows.length) {
    host.append(createElement('div', { className: 'empty-state p-[30px] text-center text-[11px]' }, ['No records match these filters.']));
    return;
  }

  // Seed the panel with the first few entries, then keep adding one new
  // location signal at a time, matching the old GeoTrail live-feed behavior.
  const initialCount=Math.min(8,feedRows.length);
  for(let i=0;i<initialCount;i++){
    streamIndex=i;
    pushStreamItem(feedRows[i]);
  }
  streamIndex=initialCount;

  if(feedRows.length>initialCount){
    streamTimer=setInterval(()=>{
      const record=feedRows[streamIndex%feedRows.length];
      pushStreamItem(record);
      streamIndex+=1;
    },1200);
  }
}
function drawInsights(rows, locations, themes) {
  const high = [...rows].sort((a, b) => Number(b.faves || 0) - Number(a.faves || 0))[0];
  const best = locations[0], theme = themes[0], insights = [];
  if (best) insights.push(['01', 'Attention gathers', `${best.name} leads this selection with ${fmt(best.count)} records, representing ${Math.round(best.count / Math.max(rows.length, 1) * 100)}% of the current collection.`]);
  if (theme) insights.push(['02', 'A defining travel theme', `${theme.name} is the most represented theme, appearing in ${fmt(theme.count)} records.`]);
  if (high) insights.push(['03', 'A standout signal', `“${high.title}” has the highest recorded appreciation in this view, with ${fmt(Math.round(high.faves))} favourites.`]);
  insights.push(['04', 'Read the context', 'These observations describe the supplied records. They are useful directional signals, not proof of causation or a forecast of future demand.']);
  $('insightList').replaceChildren(...insights.map(([number, title, description]) =>
    createElement('div', { className: 'insight-item grid grid-cols-[24px_minmax(0,1fr)] gap-[10px] border-t border-ink/20 py-3' }, [
      createElement('span', { className: 'font-mono text-[10px]' }, [number]),
      createElement('div', {}, [
        createElement('b', { className: 'text-[10px] font-bold' }, [title]),
        createElement('p', { className: 'mt-1 mb-0 text-[9px] leading-[1.6]' }, [description])
      ])
    ])
  ));
}
function render(){const rows=filteredRows(),locations=groupBy(rows,'location'),themes=groupBy(rows,'theme'),behaviors=groupBy(rows,'behavior');$('metricRecords').textContent=fmt(rows.length);$('metricFaves').textContent=fmt(Math.round(rows.reduce((s,r)=>s+Number(r.faves||0),0)));const sentiment=avg(rows,'sentiment');$('metricSentiment').textContent=`${sentiment.toFixed(1)}%`;$('sentimentBar').style.width=`${Math.max(0,Math.min(100,sentiment))}%`;$('metricLocations').textContent=fmt(new Set(rows.map(r=>r.location)).size);drawMap(rows);drawChart(locations);drawThemes(themes);drawBehaviors(behaviors,rows.length);drawFeed(rows);drawInsights(rows,locations,themes);}
function setDataset(ds){state.dataset=ds;state.location='All';state.theme='All';state.behavior='All';$('countryFilter').value=ds;document.querySelectorAll('.country-choice').forEach(b=>b.classList.toggle('active',b.dataset.country===ds));refreshOptions();render()}
function exportData(){const rows=filteredRows();const blob=new Blob([JSON.stringify({generatedAt:new Date().toISOString(),createdBy:'Kenny Richardson',project:'GeoTrail',filters:state,recordCount:rows.length,records:rows},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='geotrail-tourism-intelligence.json';a.click();URL.revokeObjectURL(url);notify(`Exported ${fmt(rows.length)} records`)}
function setupTopbarExtras(){
  const topbar=document.querySelector('.topbar'),filterBar=document.querySelector('.filter-bar');
  if(topbar&&filterBar&&filterBar.parentElement===topbar.parentElement)topbar.insertAdjacentElement('afterend',filterBar);
  const livePill=document.querySelector('.topbar-right .live-pill');
  if(livePill&&!document.querySelector('.github-top-link')){
    const link=document.createElement('a');link.className='github-top-link';
    link.href='https://github.com/kennykrichardson';link.target='_blank';link.rel='noopener noreferrer';
    link.setAttribute('aria-label','Visit Kenny Richardson on GitHub');
    const icon = createSvgElement('svg', { class: 'github-icon', viewBox: '0 0 24 24', 'aria-hidden': 'true' });
    icon.append(createSvgElement('path', { d: "M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.75 2.15 3.25 1.63.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.61 5.23-5.1 5.51.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" }));
    link.append(icon, createElement('span', {}, ['GITHUB']));
    livePill.insertAdjacentElement('afterend',link);
  }
}
function bind(){
  let resizeFrame=0;
  window.addEventListener('resize',()=>{
    cancelAnimationFrame(resizeFrame);
    resizeFrame=requestAnimationFrame(()=>{if(map)map.invalidateSize({pan:false});});
  },{passive:true});
  setupTopbarExtras();document.querySelectorAll('.country-choice').forEach(b=>b.addEventListener('click',()=>setDataset(b.dataset.country)));$('countryFilter').addEventListener('change',e=>setDataset(e.target.value));[['locationFilter','location'],['themeFilter','theme'],['behaviorFilter','behavior']].forEach(([id,key])=>$(id).addEventListener('change',e=>{state[key]=e.target.value;render()}));$('searchInput').addEventListener('input',e=>{state.search=e.target.value;render()});$('resetFilters').addEventListener('click',()=>{state.location=state.theme=state.behavior='All';state.search='';$('searchInput').value='';refreshOptions();render();notify('Filters reset')});$('exportBtn').addEventListener('click',exportData);$('fitMap').addEventListener('click',()=>{if(state.dataset==='All')map.setView([27,35],2);else map.fitBounds(COUNTRY_META[state.dataset].bounds,{padding:[20,20]})});$('mobileMenu').addEventListener('click',()=>$('sidebar').classList.toggle('open'));document.querySelectorAll('.nav-link').forEach(a=>a.addEventListener('click',()=>{$('sidebar').classList.remove('open');document.querySelectorAll('.nav-link').forEach(n=>n.classList.remove('active'));a.classList.add('active')}));}
async function boot(){try{$('todayLabel').textContent=new Intl.DateTimeFormat('en',{dateStyle:'medium'}).format(new Date()).toUpperCase();const response=await fetch(DATA_URL);if(!response.ok)throw new Error(`Dataset request failed (${response.status})`);records=await response.json();if(!Array.isArray(records)||!records.length)throw new Error('Tourism dataset is empty or invalid');initMap();bind();refreshOptions();render();if('serviceWorker'in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('/service-worker.js').catch(()=>{});}catch(error){console.error(error);$('metricRecords').textContent='DATA ERROR';$('liveFeed').replaceChildren(createElement('div', { className: 'empty-state p-[30px] text-center text-[11px]' }, [`GeoTrail could not load its dataset. ${error.message}`]));notify('Unable to load GeoTrail data')}}
boot();
