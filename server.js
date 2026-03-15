const express = require("express")
const fs = require("fs")
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.static("."))

// Lê os dados
app.get("/data", (req,res)=>{
  fs.readFile("data.json","utf8",(err,data)=>{
    if(err) return res.status(500).send("Erro a ler JSON")
    res.json(JSON.parse(data))
  })
})

// Atualiza os dados
app.post("/data",(req,res)=>{
  fs.writeFile("data.json",JSON.stringify(req.body,null,2),err=>{
    if(err) return res.status(500).send("Erro a escrever JSON")
    res.json({status:"ok"})
  })
})

app.listen(PORT,()=>console.log(`Servidor a correr na porta ${PORT}`))