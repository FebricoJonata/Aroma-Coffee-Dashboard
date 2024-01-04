import Navbar from "../../Navbar/Navbar";
import SideBar from "../../Sidebar/Sidebar";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./Create.scss";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Create = () => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    // Toggle sidebar based on window width
    const sidebar = document.getElementById("sidebar");
    if (window.innerWidth <= 768) {
      sidebar.classList.add("hide");
    }
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Toggle sidebar based on window width
    const sidebar = document.getElementById("sidebar");
    if (window.innerWidth <= 768) {
      sidebar.classList.add("hide");
    }
  }, []);

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log(downloadURL);

            // Now you can use the downloadURL as needed, e.g., save it in your 'data' state
            setData({ img: downloadURL });
          } catch (error) {
            console.error("Error getting download URL: ", error);
          }
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleAdd = async (e) => {
    e.preventDefault();
    const { name, price, description } = formData;

    try {
      const createProduct = await addDoc(collection(db, "products"), {
        name: name,
        price: price,
        description: description,
        img: data.img,
        // timeStamp: serverTimestamp(),
      });
      console.log("Document written with ID: ", createProduct.id);
      Swal.fire("Product Added!", "Successfully add product", "success");
    } catch (error) {
      console.error("Error adding document: ", error);
      Swal.fire("Failed Add Product", "Failed to add product", "error");
    }
  };

  return (
    <>
      <SideBar />
      <div id="content">
        <Navbar />
        <main>
          <div class="head-title">
            <div class="left">
              <h1>Create Item</h1>
              {windowWidth > 768 ? (
                <div class="form-content">
                  <form action="POST" onSubmit={handleAdd}>
                    <div class="input-content">
                      <input
                        name="name"
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      <span>Name</span>
                      <br />
                    </div>
                    <div class="input-content">
                      <input
                        name="price"
                        type="text"
                        id="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                      />
                      <span>Price</span>
                      <br />
                    </div>
                    <div class="input-content">
                      <input
                        name="description"
                        type="text"
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                      />
                      <span>Description</span>
                      <br />
                    </div>

                    <input
                      type="file"
                      id="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      accept="image/*"
                    />
                    <br />

                    <button
                      class="primary-button"
                      disabled={per !== null && per < 100}
                      type="submit"
                    >
                      Create Product
                    </button>
                  </form>
                </div>
              ) : null}
            </div>
            {windowWidth <= 768 ? (
              <div class="input-container">
                <input
                  name="name"
                  type="text"
                  id="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-content-styling"
                />

                <input
                  name="price"
                  type="text"
                  id="price"
                  value={formData.price}
                  placeholder="Price"
                  onChange={handleChange}
                  required
                  className="input-content-styling"
                />

                <input
                  name="description"
                  type="text"
                  id="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="input-content-styling"
                />
                <br />
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  accept="image/*"
                />
                <br />
                <button
                  class="primary-button"
                  disabled={per !== null && per < 100}
                  type="submit"
                >
                  Create Product
                </button>
              </div>
            ) : null}
          </div>
        </main>
      </div>
    </>
  );
};

export default Create;
