import styles from "./index.css"
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
          <div className={styles.content}>
            <span>{`${props.name}: `}</span>
            {props.content}
          </div >
        </div>
        <div className={styles.msgId}>
          {props.msgId}
        </div>
      </div>
    )
  }
}
export default OnlineTalk