import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export const Header = ({title}) => (
    <Fragment>
        <WrapperTitle>
            <h1>
                {title}
            </h1>
        </WrapperTitle>
    </Fragment>
)

Header.propTypes = {
    title: PropTypes.string,
}

const WrapperTitle = styled.div`
    display: flex;
    justify-content: center;
`
