class Animal{
    constructor(especie, tamanho, alimentacao, bioma){
        this.especie = especie; 
        this.tamanho = tamanho, 
        this.alimentacao = alimentacao,
        this.bioma = bioma
    }

    info(){
        console.log(`Nome: ${this.especie}. Tamanho: ${this.tamanho}. Bioma: ${this.bioma}`)
    }
}

const leao = new Animal("LEAO", 3, "CARNIVORO", ["SAVANA"])
const leopardo = new Animal("LEOPARDO", 2, "CARNIVORO", ["SAVANA"])
const crocodilo = new Animal("CROCODILO", 3, "CARNIVORO", ["RIO"])
const macaco = new Animal("MACACO", 1, "ONIVORO", ["SAVANA", "FLORESTA"])
const gazela = new Animal("GAZELA", 2, "HERBIVORO", ["SAVANA"])
const hipopotamo = new Animal("HIPOPOTAMO", 4, "ONIVERO", ["SAVANA", "RIO"])

const animais = [leao, leopardo, crocodilo, macaco, gazela, hipopotamo]
const animaisCarnivoros = ["LEAO", "LEOPARDO", "CROCODILO"]
let recintosViaveis = []

class RecintosZoo {
    analisaRecintos(animal, quantidade) {
        const recintos = [
            {
                numero: 1,
                bioma: "SAVANA",
                tamanhoTotal: 10,
                animaisExistentes: [3, "MACACO"]
            }, 
            {
                numero: 2, 
                bioma: "FLORESTA",
                tamanhoTotal: 5, 
                animaisExistentes: [0, ""] 
            }, 
            {
                numero: 3, 
                bioma: "SAVANA E RIO", 
                tamanhoTotal: 7, 
                animaisExistentes: [1, "GAZELA"]
            },
            {
                numero: 4, 
                bioma: "RIO",
                tamanhoTotal: 8,
                animaisExistentes: [0, ""]
            },
            {
                numero: 5, 
                bioma: "SAVANA", 
                tamanhoTotal: 9, 
                animaisExistentes: [1, "LEAO"]
            }
        
        ]
        const animalEscolhido = animais.find(a => a.especie === animal);
        let recintosViaveis = []
        if (!animalEscolhido) {
            return {erro: ("Animal inválido")};
        }

        if(quantidade > 10 || quantidade < 1){
            return {erro: ("Quantidade inválida")}
        }

        this.verificarEspacoOcupado(recintos, animais,animalEscolhido, quantidade)

        if(animalEscolhido.especie != "MACACO"  && animalEscolhido.especie != "HIPOPOTAMO"){
            recintos.forEach(recinto => {
                let [qtd, especieExistente] = recinto.animaisExistentes
                if(!this.verificarQuantidade(recintos, animal, quantidade) + animalEscolhido.tamanho * qtd < recinto.tamanhoTotal){
                    let recintoMontado = ""
                    if(this.verificarBioma(animalEscolhido, recinto)){  
                        if(animalEscolhido.alimentacao === "CARNIVORO"){
                            if(recinto.animaisExistentes.includes(animalEscolhido.especie)){
                                if(this.verificarQuantidade(recintos, animalEscolhido, quantidade)){
                                    recintoMontado = `Recinto ${recinto.numero} (espaço livre: ${recinto.tamanhoTotal - (quantidade * animalEscolhido.tamanho)} total: ${recinto.tamanhoTotal})`
                                    recintosViaveis.push(recintoMontado)
                                }
                                } else {
                                    recintoMontado = `Recinto ${recinto.numero} (espaço livre: ${recinto.tamanhoTotal - (quantidade * animalEscolhido.tamanho)} total: ${recinto.tamanhoTotal})`
                                    recintosViaveis.push(recintoMontado)
                            }
                        } else {
                            if(this.verificarQuantidade(recintos, animalEscolhido, quantidade)){
                                recintoMontado = `Recinto ${recinto.numero} (espaço livre: ${recinto.tamanhoTotal - (quantidade * animalEscolhido.tamanho)} total: ${recinto.tamanhoTotal})`
                                recintosViaveis.push(recintoMontado)
                            }
                        }
                    }
                } 
             });
             if(recintosViaveis.length > 0){
                return{recintosViaveis, erro: undefined }
             } else {
                return {erro: ("Não há recinto viável")}
             }
        }

        if(animalEscolhido.especie === "HIPOPOTAMO"){
            recintos.forEach(recinto => {
                let recintoMontado = ""
                let [qtd, especieExistente] = recinto.animaisExistentes
                if(recinto.bioma === "SAVANA" || recinto.bioma === "RIO" || recinto.bioma === "SAVANA E RIO"){
                    if(qtd > 0 && recinto.bioma === "SAVANA E RIO"){
                        if(this.verificarQuantidade(recintos, animalEscolhido, quantidade)){
                            recintoMontado = `Recinto: ${recinto.numero} (espaço livre: ${recinto.tamanhoTotal - (quantidade * animalEscolhido.tamanho)} total: ${recinto.tamanhoTotal})`
                            recintosViaveis.push(recinto)
                        }
                    } else if(qtd == 0){
                        if(this.verificarQuantidade(recintos, animalEscolhido, quantidade)){
                            recintoMontado = `Recinto: ${recinto.numero} (espaço livre: ${recinto.tamanhoTotal - (quantidade * animalEscolhido.tamanho)} total: ${recinto.tamanhoTotal})`
                            recintosViaveis.push(recinto)
                        }
                    }
                }
            })
            console.log(recintosViaveis)
        }

        if(animalEscolhido.especie === "MACACO"){
            if(this.verificarEspacoOcupado(recintos, animais, animalEscolhido, quantidade)  === false){
                recintos.some(recinto => {
                        let [qtd, especieExistente] = recinto.animaisExistentes;
                        // Verifica se o recinto tem um bioma adequado
                        if(recinto.bioma === "SAVANA"  || recinto.bioma === "SAVANA E RIO" || recinto.bioma === "FLORESTA"){
                            // Se o recinto estiver vazio, o macaco pode ser adicionado
                            if (qtd === 0 && quantidade > 1) {
                                if(this.verificarQuantidade(recintos, animalEscolhido, quantidade)){
                                    let espacoLivre = recinto.tamanhoTotal  - (quantidade * animalEscolhido.tamanho)
                                    let recintoMontado = `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`
                                    recintosViaveis.push(recintoMontado);
                                } 
                            } else {
                                // Verifica se a espécie existente no recinto não é carnívora
                                const animalExistenteObj = animais.find(a => a.especie === especieExistente);
                                if (animalExistenteObj && animalExistenteObj.alimentacao !== "CARNIVORO") {
                                    if(this.verificarQuantidade(recintos, animalEscolhido, quantidade)){
                                        let espacoOcupado = 0 
                                        // Verificar o animal que está no recinto e calcular o tamanho do espaço ocupado. 
                                        animais.forEach(animal => {
                                            if(animal.especie == especieExistente){
                                                espacoOcupado = animal.tamanho * qtd
                                            }
                                        })
                                        if(animalEscolhido.especie != especieExistente){
                                            espacoOcupado += 1
                                        }
                                        let espacoLivre = recinto.tamanhoTotal  - espacoOcupado - (quantidade * animalEscolhido.tamanho)
                                        let recintoMontado = `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`
                                        recintosViaveis.push(recintoMontado);
                                    } 
                                }
                            }  
                        }
                })
            }
            if(this.verificarEspacoOcupado(recintos, animais, animalEscolhido, quantidade)  === true){
                return {erro: ("Não há recinto viável")}
            }
            return{recintosViaveis, erro: undefined }
        }
    }

    verificarBioma(animal,  recinto) {
        return animal.bioma.some(a => recinto.bioma === a)
    }

    verificarCarnivoro(animal, recintos){
        if(animal.alimentacao === "CARNIVORO"){
            return recintos.some(recinto => recinto.animaisExistentes.includes(animal.especie))
        }

    }

    verificarQuantidade(recintos, animal, quantidade, animalEscolhido){  
        return recintos.some( recinto => {
            const [qtd, especieExistente] = recinto.animaisExistentes
            if(animal.especie != especieExistente){
                if(recinto.tamanhoTotal - qtd >= (quantidade * animal.tamanho) + 1){
                    return recinto.tamanhoTotal >= (quantidade * animal.tamanho) + 1
                } 
            } else {
                if(recinto.tamanhoTotal - qtd >= (quantidade * animal.tamanho) ){
                    return recinto.tamanhoTotal >=(quantidade * animal.tamanho)
                }
            }
            return false
        })
    } 

    verificarEspacoOcupado(recintos, animais, animalEscolhido, quantidade){
        return recintos.some(recinto => {
            let [qtd, animaisExistentes] = recinto.animaisExistentes
            if(qtd > 0){
                return animais.some(animal => {
                    if(animal.especie === animaisExistentes){
                        let espacoTotalOcupado = ((animal.tamanho * qtd) + animalEscolhido.tamanho * quantidade)
                        if(espacoTotalOcupado > recinto.tamanhoTotal){
                            return true 
                        } else {
                            return false
                        }
                    }
                })
            }
            return false
        })
    }
}
new RecintosZoo().analisaRecintos("MACACO", 2);
//console.log(resultado)
export { RecintosZoo as RecintosZoo };
