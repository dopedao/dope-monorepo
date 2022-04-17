
import Script from "next/script";
const STREAM_MEASUREMENT_ID = 'G-EKP25K3SGT';

const GoogleAnalytics = () => <>
  {/* Global Site Tag (gtag.js) - Google Analytics */}
  <Script
    strategy="lazyOnload"
    src={`https://www.googletagmanager.com/gtag/js?id=${STREAM_MEASUREMENT_ID}`}
  />
  <Script strategy="lazyOnload" id="google-analytics-config">
    {`
      try {
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', ${STREAM_MEASUREMENT_ID}, {
          page_path: window.location.pathname,
        });
      } catch(e) {
        console.log('Google Analytics load error');
        console.log(e);
      }
    `}
  </Script>
</>;

export default GoogleAnalytics;