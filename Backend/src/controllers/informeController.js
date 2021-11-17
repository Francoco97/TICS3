const pool = require('../config/database.js');
const fs = require('fs')
const path = require('path')
const htmlToPdf = require('html-to-pdf');
const pdf = require('html-pdf');

informeController = {}

informeController.postGuardarInforme = async (req, res) => {
  let options = { format: 'Letter' };
  let rut_infante = req.body.rut_infante;
  let contenido = req.body.contenido;
  let id_informe = req.body.id_informe;
  let fecha = new Date().toISOString().slice(0, 10);
  if(id_informe == 0){
    pool.query('BEGIN', async (err) => {
      if(err){return res.sendStatus(404)}
      pool.query('INSERT INTO informe(rut_infante, rut_usuario, fecha) VALUES ($1, $2, $3) RETURNING id',[rut_infante, req.user.rut, fecha], async (err, result) => {
        if(err){return res.sendStatus(404)}
        id_informe = result.rows[0].id

        fs.writeFile(path.join(__dirname, '../public/informes/informe'+id_informe+'.html'), contenido, async (err) => { 
          let html = fs.readFileSync(path.join(__dirname, '../public/informes/informe'+id_informe+'.html'), 'utf8');
          if (err) {
            pool.query('ROLLBACK');
            return res.sendStatus(404);
          }
          pdf.create(html, options).toFile(path.join(__dirname, '../public/informes/informe'+id_informe+'.pdf'), function(err) {
            if (err) {
              pool.query('ROLLBACK')
              return res.sendStatus(404)
            }
            pool.query('COMMIT', (err) => {
              if(err){return res.sendStatus(404)}
              return res.json({
                  id_informe: id_informe
                }
                );
            })
          });
        });
      })
    })
  }else{
    pool.query('UPDATE informe SET fecha = $1 WHERE id = $2', [fecha, id_informe], async (err) => {
      if(err){return res.sendStatus(404)}
      fs.writeFile(path.join(__dirname, '../public/informes/informe'+id_informe+'.html'), contenido, async (err) => { 
        let html = fs.readFileSync(path.join(__dirname, '../public/informes/informe'+id_informe+'.html'), 'utf8');
        if (err) {
          pool.query('ROLLBACK');
          return res.sendStatus(404);
        }
        pdf.create(html, options).toFile(path.join(__dirname, '../public/informes/informe'+id_informe+'.pdf'), function(err) {
          if (err) {
            pool.query('ROLLBACK')
            return res.sendStatus(404)
          }
          pool.query('COMMIT', (err) => {
            if(err){return res.sendStatus(404)}
            return res.json({
                id_informe: id_informe
              }
              );
          })
        });
      });
    })
  }
}

informeController.postVerInforme = async (req, res) => {
  let id_informe = req.body.id_informe;
  let archivo = path.join(__dirname, '../public/informes/informe' + id_informe+ '.pdf');
  fs.readFile(archivo , function (err,data){
    if(err){return res.sendStatus(404);}
    res.contentType("application/pdf");
    res.send(data);
  });
}

informeController.postEliminarInforme = async (req, res) => {
  let id_informe = req.body.id_informe;

  pool.query('DELETE FROM informe WHERE id = $1', [id_informe], (err) => {
    if(err){return res.sendStatus(404)}
    let archivo_pdf = path.join(__dirname, '../public/informes/informe' + id_informe+ '.pdf');
    let archivo_html = path.join(__dirname, '../public/informes/informe' + id_informe+ '.html');
    fs.unlink(archivo_html, (err) => {
      if(err){return res.sendStatus(404)}
      fs.unlink(archivo_pdf, (err) => {
        if(err){return res.sendStatus(404)}
        return res.sendStatus(200);
      })
    })
  })
}

informeController.postEditarInforme = async (req, res) => {
  let options = { format: 'Letter' };
  let contenido = req.body.contenido;
  let id_informe = req.body.id_informe;
  let fecha = new Date().toISOString().slice(0, 10);
  pool.query('UPDATE informe SET fecha = $1 WHERE id = $2', [fecha, id_informe], async (err) => {
    if(err){return res.sendStatus(404)}
    fs.writeFile(path.join(__dirname, '../public/informes/informe'+id_informe+'.html'), contenido, async (err) => { 
      let html = fs.readFileSync(path.join(__dirname, '../public/informes/informe'+id_informe+'.html'), 'utf8');
      if (err) {
        pool.query('ROLLBACK');
        return res.sendStatus(404);
      }
      pdf.create(html, options).toFile(path.join(__dirname, '../public/informes/informe'+id_informe+'.pdf'), function(err) {
        if (err) {
          pool.query('ROLLBACK')
          return res.sendStatus(404)
        }
        pool.query('COMMIT', (err) => {
          if(err){return res.sendStatus(404)}
          return res.json({
              id_informe: id_informe
            }
            );
        })
      });
    });
  })
}

module.exports = informeController;