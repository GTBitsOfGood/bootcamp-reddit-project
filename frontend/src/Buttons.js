import React from "react"

const Button = props => {
    const [upButtonSelected, setUpButton] = React.useState(false)
    const [downButtonSelected, setDownButton] = React.useState(false)
    const toggleUpButton = () => setUpButton(!upButtonSelected)
    const toggleDownButton = () => setDownButton(!downButtonSelected)
    if (upButtonSelected === true) {
        setDownButton(false)
    }
    if (downButtonSelected === true) {
        setDownButton(false)
    }
    console.log(upButtonSelected)
    console.log(downButtonSelected)
}