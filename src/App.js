import React from "react";

import Tesseract from "tesseract.js";

import "./style.css";

import { createWorker } from 'tesseract.js';

const worker = await createWorker({
  logger: m => console.log(m)
  });

  (async () => {
    await worker.loadLanguage('eng');
      await worker.initialize('eng');
        const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
          console.log(text);
            await worker.terminate();
            })();
export default function App() {
  return (
    <div>
      <html> 
           <head> 
                <script src="/dist/tesseract.dev.js"></script> 
                   </head> 
                      <body> 
                           <div> 
                                  <input type="file" id="uploader"> 
                                         <button id="download-pdf" disabled="true">Download PDF</button> 
                                              </div> 
                                                   <textarea id="board" readonly rows="8" cols="80">Upload an image file</textarea> 
                                                        <script type="module"> 
                                                               const { createWorker } = Tesseract; 
                                                                      const worker = await createWorker({ 
                                                                               corePath: '/node_modules/tesseract.js-core/tesseract-core.wasm.js', 
                                                                                        workerPath: "/dist/worker.dev.js", 
                                                                                                 logger: m => console.log(m), 
                                                                                                        }); 
                                                                                                               const uploader = document.getElementById('uploader'); 
                                                                                                                      const dlBtn = document.getElementById('download-pdf'); 
                                                                                                                             let pdf; 
                                                                                                                                    const recognize = async ({ target: { files }  }) => { 
                                                                                                                                             await worker.loadLanguage('eng'); 
                                                                                                                                                      await worker.initialize('eng'); 
                                                                                                                                                               const res = await worker.recognize(files[0],{pdfTitle: "Example PDF"},{pdf: true}); 
                                                                                                                                                                        pdf = res.data.pdf; 
                                                                                                                                                                                 const text = res.data.text; 
                                                                                                                                                                                          const board = document.getElementById('board'); 
                                                                                                                                                                                                   board.value = text; 
                                                                                                                                                                                                            dlBtn.disabled = false; 
                                                                                                                                                                                                                   }; 
                                                                                                                                                                                                                          const downloadPDF = async () => { 
                                                                                                                                                                                                                                   const filename = 'tesseract-ocr-result.pdf'; 
                                                                                                                                                                                                                                            const blob = new Blob([new Uint8Array(pdf)], { type: 'application/pdf' }); 
                                                                                                                                                                                                                                                     if (navigator.msSaveBlob) { 
                                                                                                                                                                                                                                                                // IE 10+ 
                                                                                                                                                                                                                                                                           navigator.msSaveBlob(blob, filename); 
                                                                                                                                                                                                                                                                                    } else { 
                                                                                                                                                                                                                                                                                               const link = document.createElement('a'); 
                                                                                                                                                                                                                                                                                                          if (link.download !== undefined) { 
                                                                                                                                                                                                                                                                                                                       const url = URL.createObjectURL(blob); 
                                                                                                                                                                                                                                                                                                                                    link.setAttribute('href', url); 
                                                                                                                                                                                                                                                                                                                                                 link.setAttribute('download', filename); 
                                                                                                                                                                                                                                                                                                                                                              link.style.visibility = 'hidden'; 
                                                                                                                                                                                                                                                                                                                                                                           document.body.appendChild(link); 
                                                                                                                                                                                                                                                                                                                                                                                        link.click(); 
                                                                                                                                                                                                                                                                                                                                                                                                     document.body.removeChild(link); 
                                                                                                                                                                                                                                                                                                                                                                                                                } 
                                                                                                                                                                                                                                                                                                                                                                                                                         } 
                                                                                                                                                                                                                                                                                                                                                                                                                                }; 
                                                                                                                                                                                                                                                                                                                                                                                                                                       uploader.addEventListener('change', recognize); 
                                                                                                                                                                                                                                                                                                                                                                                                                                              dlBtn.addEventListener('click', downloadPDF); 
                                                                                                                                                                                                                                                                                                                                                                                                                                                   </script> 
                                                                                                                                                                                                                                                                               i                                                                                                                                                                       </body> 
                                                                                                                                                                                                                                                                                                                                                                                                                                                       </html>
                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    </div>
  );
}
