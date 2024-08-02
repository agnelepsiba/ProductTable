import styles from "./noContent.module.scss";

import React from "react";

export default function IfEmptyContent(props:any) {
  return (
    <>
      <div className={`${props.class} ${styles.noMessage}`}>
        <div className={styles.noMessageinner}>
          <img src={props.image} alt="" />
          <p className={styles.noMessageTitle}>{props.title}</p>
          <p className={styles.noMessageDesc}>
            {props.description}
          </p>
        </div>
      </div>
    </>
  );
};