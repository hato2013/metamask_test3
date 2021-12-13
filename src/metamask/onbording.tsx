import MetaMaskOnboarding from '@metamask/onboarding' 
import React from 'react' 
import { MetaMaskInpageProvider } from "@metamask/providers" 
import { render } from 'react-dom' 

declare global {
    interface Window {
        ethereum: any 
    }
}


const ONBOARD_TEXT = 'Click here to install MetaMask!' 
const CONNECT_TEXT = 'Connect' 
const CONNECTED_TEXT = 'Connected' 

const OnboardingButton =() => {
    const [buttonText, setButtonText] = React.useState(ONBOARD_TEXT) 
    const [isDisabled, setDisabled] = React.useState(false) 
    const [accounts, setAccounts] = React.useState([]) 
    const onboarding = React.useRef<MetaMaskOnboarding>()

    React.useEffect(() => {
        if (!onboarding.current) {
            onboarding.current = new MetaMaskOnboarding() 
        }
    }, []) 

    React.useEffect(() => {
        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            if (accounts.length > 0) {
                setButtonText(CONNECTED_TEXT) 
                setDisabled(true) 
                onboarding.current.stopOnboarding() 
            } else {
                setButtonText(CONNECT_TEXT) 
                setDisabled(false) 
            }
        }
    }, [accounts]) 

    React.useEffect(() => {
        function handleNewAccounts(newAccounts) {
            setAccounts(newAccounts) 
        }
        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .then(handleNewAccounts) 
            window.ethereum.on('accountsChanged', handleNewAccounts) 
            return () => {
                window.ethereum.off('accountsChanged', handleNewAccounts) 
            } 
        }
    }, []) 

    const onClick = () => {
        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            window.ethereum.request({ method: 'eth_requestAccounts' }).then((newAccounts) => setAccounts(newAccounts)) 
        } else {
            onboarding.current.startOnboarding() 
        }

    } 
    return (

        <button disabled={isDisabled} onClick={onClick}>
            {buttonText}
        </button>
    ) 
}

export default OnboardingButton