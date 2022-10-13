const express = require("express")
const app = express()
const listaDeTarefas = require("./model/todo-list.json")
const port = 3000

app.use(express.json())

/*criaremos uma rota utilizando o método PUT que atualiza todos os dados da lista de tarefas 
e caso não encontre, cria o item.*/
app.put("/tarefas/:id",(req, res)=>{
    const IDtarefa = req.params.id
    const tarefaAtualizada = req.body

    const temTarefa = listaDeTarefas.find(tarefa => tarefa.id == IDtarefa)

    if(temTarefa){
        return res.status(200).json(tarefaAtualizada)
    }

    listaDeTarefas.push(tarefaAtualizada)

    return res.status(201).json(tarefaAtualizada) 
    // STATUS CODE : ACCEPTED
})
//amos atualizar um registro na lista de tarefas utilizando o método PATCH//
app.patch("/tarefas/:id", (req, res) => {
    const IDtarefa = req.params.id
    const novosCampos = req.body

    const existeTarefa = listaDeTarefas.find(tarefa => tarefa.id == IDtarefa)

    if(existeTarefa) {
        const tarefaAtualizada = {
            ...existeTarefa,
            ...novosCampos
        }
    return  res.status(200).json(tarefaAtualizada)
    }
    return res.status(404).json({
        message:"Tarefa não foi encontrada"
    })
})
//apagaremos uma tarefa da lista utilizando o método DELETE.// 
app.delete("/tarefas/:id", (req, res) => {
    const IDtarefa = req.params.id

    const existeTarefa = listaDeTarefas.find((tarefa) => tarefa.id === IDtarefa)

    if(existeTarefa){
        novaLista = listaDeTarefas.filter((tarefa, index) => {
       
            return tarefa.id != IDtarefa

        })
        console.log(novaLista)

         return res.status(200).json(listaDeTarefas)
    }
    return res.status(404).json({
        message: "Tarefa não foi encontrada"
    })
})


app.listen(port, ()=> {
    console.log(`Api esta rodando na porta ${port}`)
})



