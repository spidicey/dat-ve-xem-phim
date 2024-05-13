import styles from "@/components/dashboard/users/singleUser/singleUser.module.css";
import Image from "next/image";

const SingleUserPage = async ({ params }: { params: any }) => {
  const { id } = params;
  console.log(id)
  console.log("asdasd");
  //   const user = await fetchUser(id);
  type User = {
    id: number;
    img?: string;
    name: string;
    username: string;
    email: string;
    phone?: string;
    address?: string;
    isAdmin: boolean;
    isActive: boolean;
    createdAt: Date;
    role: string;
    action: string;
  };

  const user: User = {
    id: 1,
    img: "/path/to/image.jpg",
    name: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    createdAt: new Date(),
    isAdmin: true,
    isActive: true,
    role: "Admin",
    action: "Edit",
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={"/noavatar.png"} alt="" fill />
        </div>
        {user.username}
      </div>
      <div className={styles.formContainer}>
        <form action={""} className={styles.form}>
          <input type="hidden" name="id" value={user.id} />
          <label>Username</label>
          <input type="text" name="username" placeholder={user.username} />
          <label>Email</label>
          <input type="email" name="email" placeholder={user.email} />
          <label>Password</label>
          <input type="password" name="password" />
          <label>Phone</label>
          <input type="text" name="phone" placeholder={user.phone} />
          <label>Address</label>
          <textarea name="address" placeholder={user.address} />
          <label>Is Admin?</label>
          <select
            name="isAdmin"
            id="isAdmin"
            defaultValue={user.isAdmin ? "true" : "false"}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <label>Is Active?</label>
          <select
            name="isActive"
            id="isActive"
            value={user.isActive ? "true" : "false"}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;
