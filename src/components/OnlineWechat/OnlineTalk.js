import styles from "./index.css"
// import PropsTypes from 'prop-types'
import React from 'react'
class OnlineTalk extends React.Component {
  render() {
    let { props } = this
    return (
      <div className={styles.box}>
        <div style={{ display: "flex" }}>
          <div style={{ width: "100px", display: "flex", alignItems: "center" }}>
            <img src={props.avatar}></img>
          </div>
          <div className={styles.context}>
            <span>{`${props.name}: `}</span>
            {props.context}
          </div >
        </div>
        <div className={styles.msgId}>
          {props.msgId}
        </div>
      </div>
    )
  }
}
// OnlineTalk.prototype = {
//   name: PropsTypes.string,
//   avatar: PropsTypes.string,
//   context: PropsTypes.string,
//   msgId: PropsTypes.string
// }
export default OnlineTalk