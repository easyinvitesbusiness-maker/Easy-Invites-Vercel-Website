# Easy Invites

Open index.html in a browser or run `python -m http.server 8000` and open http://localhost:8000.

## Add your live invitations
In config.js, paste each published HTTPS invitation link into its `url` field. Blank fields open the included sample. To add a design, duplicate a record, supply its own image in assets/, and add a matching demo folder if you want a local fallback.

## Receive enquiries
Out of the box, the form prepares a message for guests to copy into Instagram DMs. It sends no data automatically. To accept submissions directly, create a Formspree form and paste the HTTPS endpoint into `formEndpoint` in config.js. Verify the destination in Formspree and send a test enquiry from your deployed site before sharing it.

## Deploy
Extract the ZIP into a GitHub repository with index.html at the root. Import the repository into Vercel as a static project using the Other framework preset and an empty build command.
