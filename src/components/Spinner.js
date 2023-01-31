import React, { Component } from 'react';
import Hourglass from './Hourglass.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div className="text-center my-4">
         <img src={Hourglass} alt="Loading" />
      </div>
    )
  }
}
