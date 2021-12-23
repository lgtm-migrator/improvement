import React from 'react'
import { Outlet } from 'react-router'

type Props = { open: boolean }

const ModalRoute = ({ open }: Props) => {
    return open ? <Outlet /> : <></>
}

export default ModalRoute
