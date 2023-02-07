const { createBot, 
    createProvider, 
    createFlow, 
    addKeyword } = require('@bot-whatsapp/bot') 

/*const QRPortalWeb = require('@bot-whatsapp/portal')*/
const WsProvider = require('@bot-whatsapp/provider/baileys')
const DBProvider = require('@bot-whatsapp/database/mock')

const FlujoPrincipal = addKeyword(['hola','oe','buenas'])
.addAnswer(['Bienvenido oe', 'Hoy tenemos ofertas' ])
.addAnswer('Cual es tu email?',{capture:true},(ctx,{fallBack}) => {

    if(!ctx.body.includes('@')){
        return fallBack()
    }
    
    console.log('Mensaje entrante: ',ctx.body)

})

const FlujoSecundario = addKeyword('gracias')
.addAnswer('De nada!')

const main = async () =>{
    
    const adapterDB = new DBProvider()
    const adapterFlow = createFlow([FlujoPrincipal, FlujoSecundario])
    const adapterProvider = createProvider(WsProvider)

    createBot(
        {
            flow: adapterFlow,
            provider: adapterProvider,
            database: adapterDB,
        }
    )
}

main()