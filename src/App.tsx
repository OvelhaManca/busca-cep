import { useState } from 'react'
import '../app/globals.css'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Input } from './components/ui/input'
import { AiOutlineSearch } from 'react-icons/ai'
import { Button } from './components/ui/button'
import api from './services/api'
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
// import { useToast } from "@/components/ui/use-toast"

interface cepProps {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  complemento: string;
}
function App() {
  
  const [cep, setCep] = useState<cepProps>({
    cep: '', 
    logradouro: '', 
    bairro: '', 
    localidade: '',
    complemento: ''
  })

  const [input, setInput] = useState('')

  async function handleSearch(){

    if(input === ''){
      toast.error("Digite um CEP válido.")
      return
    }
    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')
      console.log(response.data)
    } catch (error) {
      setInput('')
      toast.error("CEP inválido, tente novamente.")
    }

  }


  return (
    <div className='flex min-h-screen items-center justify-center bg-slate-50'>
      <Card className='w-[440px] h-[500px]'>
        <CardHeader>
          <CardTitle>Busca CEP</CardTitle>
          <CardDescription>Busque abaixo o seu CEP</CardDescription>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input 
              type="text" 
              placeholder="Digite seu CEP" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              />

              <Button type="submit" onClick={handleSearch}> 
                <AiOutlineSearch size={25}/>
                <Toaster richColors />
              </Button>
            </div>
        </CardHeader>
        <CardContent className='flex justify-center items-center flex-col'>
          <h2 className='font-bold text-xl my-2'>CEP: {cep.cep}</h2>
          <span className='font-bold my-2'>Rua: {cep.logradouro}</span>
          <span className='font-bold my-2'>Complemento: {cep.complemento}</span>
          <span className='font-bold my-2'>Bairro: {cep.bairro}</span>
          <span className='font-bold my-2'>Localidade: {cep.localidade}</span>
        </CardContent>
        {/* <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
      </Card>
      
    </div>
  )
}

export default App
