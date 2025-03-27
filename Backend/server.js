import express from 'express';
import cors from 'cors';
import pdfEndpoint from './Pdf/Routing Endpoint/generatePdf.js'

const app = express();
const port = 5000;

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));

app.use(express.json());

app.use('/Pdf', pdfEndpoint);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
