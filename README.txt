OWEDS CLIENT REVISION - STATIC WEBSITE

PAGES
- index.html: new client-provided home copy and benefit list
- about.html: Our Aim and Our Approach, plus child section links
- core-team.html: client-provided four core team profiles
- consultants.html and partners.html: clean placeholders because the PDF did not contain profile details
- solutions.html: FOWEPSL project copy and figures provided in the PDF
- offshore-wind-measurement.html and deep-water-quayside.html: child-tab landing pages with placeholders pending client-approved copy
- news.html: client-provided news item and source link
- education.html: page shell included based on the requested page list; the client PDF did not provide education copy
- contact.html: enquiry form configured for admin@oweds.lk
- thank-you.html: post-submission page

DESIGN
- Shared 66px desktop company banner; centered single-line company name with responsive font sizing
- Same banner background on all pages
- Reduced footer height and right-aligned footer contact block / bottom-right rights notice
- Bootstrap 5.3.3, Font Awesome 6.7.2, and Google Fonts Inter loaded from CDNs
- Responsive layout, mobile navigation, page metadata, canonical URLs, Open Graph/Twitter tags, JSON-LD Organization schema, robots.txt and sitemap.xml
- Thin placeholder pages (Education, Consultant Associates, Our Partners and the two Solutions child pages) are set to noindex until approved content is provided

CONTACT FORM: IMPORTANT
The form action uses FormSubmit (https://formsubmit.co) to deliver form submissions to admin@oweds.lk without needing a custom server backend. The recipient must receive and confirm FormSubmit's initial activation email. Until that activation is complete, the contact form is configured but delivery is not confirmed. Test the form on the deployed website (or a local web server), not by opening contact.html directly as a file.

The _next field currently points to https://oweds.lk/thank-you.html. Update it if the final website domain or thank-you page URL changes. FormSubmit's first-use activation is documented at https://formsubmit.co/documentation.

CONTENT STILL NEEDED FROM CLIENT
- Consultant associate details and partner names/logos
- Approved detailed copy for Offshore Wind Measurement in Sri Lanka
- Approved detailed copy for Deep Water Quayside
- Approved Education page copy/resources
- Official company social profile URLs (current footer icons point to the general social platform home pages, inherited from the source website)

DEPLOYMENT
Upload the contents of this folder to the website document root. Keep the assets folder structure intact.
