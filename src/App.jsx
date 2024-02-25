import {
  Header,
  Footer,
  Input,
  Button,
  TextArea,
  Select,
  Table,
  Loader,
} from "./components";
import { data as dataJson } from "./utils/data";
import { useState, useRef, useEffect, useCallback } from "react";
import { validate } from "./utils/validate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  registerUser,
  getUser,
  updateUser,
  deleteUser,
} from "./utils/fetchUtils";

const App = () => {
  const [data, setData] = useState(dataJson);
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [serverData, setServerData] = useState([]);
  const [editData, setEditData] = useState();
  const fileInputRef = useRef();

  // getting data from server in first render
  useEffect(() => {
    getServerData();
    setIsLoading(false);
  }, []);

  // function go get server data from the server
  const getServerData = async () => {
    const res = await getUser();
    if (!res) {
      console.log("couldn't get server data");
    }
    setServerData(res);
  };

  // scroll function to scroll the page depending on the button clicked
  const scrollPage = (amount) => {
    // Scroll to the top of the page
    window.scrollTo({
      top: amount,
      behavior: "smooth", // Optional: for smooth scrolling
    });
  };

  // onchange Handler to handle onchange events
  const onChangeHandler = (event) => {
    const { name, value, checked, id, files } = event.target;
    let errorMsg;
    // for every call of onChangeHandler we clone the object for which we are making changes
    const clonedData = JSON.parse(JSON.stringify(data));
    const currentObj = clonedData.find((item) => item.name === name);

    // logic for updating data we get from client for email password and gender
    if (
      name === "email" ||
      name === "password" ||
      name === "gender" ||
      name === "address" ||
      name === "country"
    ) {
      currentObj.value = value;
      errorMsg = validate(name, value);
    }

    // logic for updating the data we get from the client for country
    if (name === "hobbies") {
      let checkedValues = currentObj.value ? currentObj.value.split(",") : [];
      if (checked) {
        checkedValues.push(id);
      } else {
        let index = checkedValues.indexOf(id);
        checkedValues.splice(index, 1);
      }
      const str = checkedValues.join();
      currentObj.value = str;
      errorMsg = validate(name, value);
    }

    // logic for updating the data we get from the client for image upload
    if (name === "image") {
      // whenever a client selects an image we will first set preview to empty as no preview image should be shown
      setImagePreview("");

      // code when client selects an image
      const selectedFile = files[0];
      if (selectedFile) {
        errorMsg = validate(name, value, selectedFile.size, selectedFile.type);
        if (!errorMsg) {
          currentObj.value = selectedFile;
          currentObj.imageName = selectedFile.name;
          const reader = new FileReader();
          reader.readAsDataURL(selectedFile);
          reader.onloadend = () => {
            setImagePreview(reader.result);
          };
        } else {
          // if error is there then we how to show the default message of no file choosen
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }
      }
    }
    // setting the changed value in data
    currentObj.errorMsg = errorMsg;
    setData(clonedData);
  };

  // function to handle the form on submission
  const onSubmit = async () => {
    // setting loader to true
    setIsLoading(true);
    // lets validate the form data
    let isValid = true;
    let dataObj = {};
    const clonedData = JSON.parse(JSON.stringify(data));

    // setting the value in the dataObj and Checking for the error
    clonedData.map((item) => {
      if (item.name !== "image") {
        dataObj[item.name] = item.value;
      } else {
        dataObj[item.name] = imagePreview;
        dataObj["imageName"] = item.imageName;
      }
      const errorMsg = validate(item.name, item.value);
      item.errorMsg = errorMsg;
      if (errorMsg) isValid = false;
    });

    // if validation does not fail then set the value and error message to empty string
    if (isValid) {
      // setting the value of each tag and imagePreview to the empty string
      clonedData.map((item) => {
        item.value = "";
        item.errorMsg = "";
        item.imageName = "";
      });
      setImagePreview("");

      // sending the data to the server
      if (editData) {
        const res = await updateUser(editData._id, dataObj);
        setIsLoading(false);
        if (res.acknowledged && res.matchedCount) {
          toast.success("Updated Successfully");
        } else {
          toast.error("failed to update user");
        }
        setEditData("");
      } else {
        scrollPage(document.body.scrollHeight);
        const res = await registerUser(dataObj);
        setIsLoading(false);
        if (res.acknowledged) {
          toast.success("User Registered");
        } else {
          toast.error("User Not Registered");
        }
      }

      // resetting the value of the input:file to the default value(empty string)
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // if the validation is  successful the set the data to the useState hook data
      setData(clonedData);
    } else {
      // if there is an erro then setting the error to errorMessage and updation the data..
      setData(clonedData);
    }

    // setting the loading to false..
    getServerData();
    setIsLoading(false);
  };

  // function to edit the data
  const onEditButtonClick = (event) => {
    scrollPage(0);
    const id = event.target.id;
    const editableObj = serverData.find((obj) => obj._id === id);

    // clonnig and setting the value of each object to the value which is present in the input fileds
    const clonedData = JSON.parse(JSON.stringify(data));
    clonedData.map((item) => {
      item.value = editableObj[item.name];
      if (item.name === "image") {
        item.imageValue = editableObj["imageName"];
      }
    });

    setData(clonedData);
    setImagePreview(editableObj.image);
    setEditData(editableObj);
    getServerData();
  };

  // function to delete the data
  const onDeleteButtonClick = async (event) => {
    setIsLoading(true);
    const id = event.target.id;
    const res = await deleteUser(id);
    if (res.acknowledged && res.deletedCount) {
      toast.success("Deleted Successfully");
      setIsLoading(false);
    } else {
      toast.error("couldn't delete");
      setIsLoading(false);
    }
    getServerData();
  };
  console.log("serverData -->", serverData);
  return (
    <>
      <Header />
      <ToastContainer />
      <Loader isLoading={isLoading} />
      <div className=" mx-auto max-w-xl bg-slate-700 shadow-md h-auto px-5 py-3 mt-5 rounded-md">
        <div className="text-center text-white text-lg pt-5">
          Registration Form
        </div>
        {data.map((item, index) => {
          return (
            <div className="w-full text-white" key={index}>
              {item.label === "UserId" ||
              item.label === "Password" ||
              item.label === "Gender" ||
              item.label === "Hobbies" ||
              item.label === "Image" ? (
                <Input
                  {...item}
                  onChangeHandler={onChangeHandler}
                  imagePreview={imagePreview}
                  fileInputRef={fileInputRef}
                />
              ) : item.label === "Address" ? (
                <TextArea {...item} onChangeHandler={onChangeHandler} />
              ) : (
                <Select {...item} onChangeHandler={onChangeHandler} />
              )}
            </div>
          );
        })}
        <Button
          onSubmit={onSubmit}
          isLoading={isLoading}
          buttonText={editData ? "Update" : "Register"}
        />
      </div>
      {/* ************** table to show the data ************** */}
      <div className="mx-auto max-w-xxl my-10 px-10  text-center">
        {serverData?.length > 0 ? (
          <Table
            tableHeading={[
              "Image",
              "Email",
              "Gender",
              "Country",
              "Hobbies",
              "Address",
            ]}
            tableRows={serverData}
            tableData={[
              "image",
              "email",
              "gender",
              "country",
              "hobbies",
              "address",
            ]}
            fileInputRef={fileInputRef}
            onEditButtonClick={onEditButtonClick}
            onDeleteButtonClick={onDeleteButtonClick}
          />
        ) : (
          <b className="text-white">No Data Found</b>
        )}
      </div>
      <Footer />
    </>
  );
};

export default App;
