const chalk = require('chalk')
const notes=require('./notes.js')
const yargs=require('yargs')
const { demandOption } = require('yargs')

yargs.command({
    command:'add',
    describe:'add notes',
    builder:{
        title:{
            describe:'note title',
            demandOption:true,
            type:'string'
        },
        body:{
            describe:'note body',
            demandOption:true,
            type:'string'
        }
    },
    handler(args){
        notes.addNote(args.title,args.body)

    }
})

yargs.command({
    command:'remove',
    describe:'remove notes',
    builder: { title:{
        describe: 'note title',
        demandOption: true,
        type: 'string'
    } },
    handler(args){
        notes.removeNote(args.title)
    }
})

yargs.command({
    command:'list',
    describe:'list notes',
    handler(){
        notes.listNotes()
    }
})

yargs.command({
    command:'read',
    describe:'read notes',
    builder:{
        title: { describe:'note title',
    demandOption: true,
type: 'string' }
    },
    handler(args){
        notes.readNote(args.title)
    }
})


// console.log(yargs.argv)

yargs.parse()