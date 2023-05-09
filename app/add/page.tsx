import styles from "./page.module.css";

const Page = () => {
  const handleOnSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div className={styles["form-group"]}>
        <label htmlFor="name">Name</label>
        <input name="name" id="name" type="text" />
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="name">Name</label>
        <input name="name" id="name" type="text" />
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="name">Name</label>
        <input name="name" id="name" type="text" />
      </div>
    </form>
  );
};

export default Page;
