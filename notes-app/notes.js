const fs = require('fs')
const chalk = require('chalk')


const addNote=(title,body)=>{

    const notes = loadNotes()
    const duplicate=notes.find((note)=>note.title===title)
    if(!duplicate){
    notes.push({title,body})

    saveNotes(notes)
    console.log(chalk.green.inverse('New note added'))}
    else{
        console.log(chalk.red.inverse('Note title already exist'))
    }

}

const removeNote=(title)=>{
    const notes=loadNotes()
    const notesUpdate=[]
    let isDeleted=false
    notes.forEach(element => {
        if(element.title!==title)notesUpdate.push(element)
        else isDeleted=true
    })
    if(isDeleted) {
        console.log(chalk.green.inverse('Note deleted'))
        saveNotes(notesUpdate)
        
    }
    else console.log(chalk.red.inverse('Note not found'))

}

const listNotes=()=>{
    const notes=loadNotes()

    console.log(chalk.blue('Your notes'))
    notes.forEach((note)=>{
        console.log(note.title)
    })
}

const readNote=(title)=>{
    const notes=loadNotes()
    const found=notes.find((note)=>note.title===title)

    if(found){
        console.log('title:' + chalk.blue(found.title))
        console.log('body:'+found.body)
    }else{
        console.log(chalk.red.inverse('Note not found'))
    }

}

const loadNotes=()=>{
    try{
        const dataBuffer=fs.readFileSync('notes.json')
        const jsonData=dataBuffer.toString()
        return JSON.parse(jsonData)
    }catch (err){
        return []
    }
}

const saveNotes = (notes)=>{

    const jsonData=JSON.stringify(notes)
    fs.writeFileSync('notes.json',jsonData)

}


module.exports ={addNote,removeNote,listNotes,readNote}