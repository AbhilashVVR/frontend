import { Alert, Box, Button, Typography } from "@mui/material";
import config from "config";
import { useState } from "react";
import { useNavigate } from "react-router";
import swal from "sweetalert";
// project imports
import MainCard from "ui-component/cards/MainCard";
import "../index.css";

const AddBanner = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageValidate, setImageValidate] = useState(false);
  const formData = new FormData();
  const navigate = useNavigate();
  // convertFileToBase64
  const convertBase64 = (file) => {
    const convertImage = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
    return convertImage;
  };
  // submit 
  const handleBannerFile = (e) => {
    e.preventDefault();
    const file = imageFile[0];
    // converted file
    convertBase64(file).then((image) => {
      const stringLength = image.length - "data:image/png;base64,".length;
      const sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
      const sizeInKb = sizeInBytes / 1000;

      if (sizeInKb < 200) {
        const bannerData = {
          banner: image,
        };
        formData.append("data", JSON.stringify(bannerData));
        setImageValidate(false);
        // data post
        fetch(`${config.apiServer}/banner/createBanner`, {
          method: "POST",
          mode: "cors",

          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            swal({
              title: "Success",
              text: "Banner Created Successfully",
              icon: "success",
              button: true,
            }).then((willSuccess) => {
              if (willSuccess) {
                navigate("/admin/banner/banner-list");
              }
            });
          })
          .catch((error) => {});
      } else {
        setImageValidate(true);
      }
    });
    setImageFile(null);
    e.target.reset();
  };

  return (
    <>
      <MainCard title=" Add Banner">
        <Box>
          <form onSubmit={handleBannerFile}>
            <Typography variant="caption" display="block" gutterBottom>
              *Image Size should be less than 200 KB
            </Typography>
            {/* image upload */}
            <Box>
              <label htmlFor="contained-button-file">
                <span className="FlexButton">
                  {!imageFile ? (
                    <div className="FlexButton_uploadText">
                      <Button variant="contained" component="span">
                        Upload Images
                      </Button>
                    </div>
                  ) : (
                    <div className="FlexButton_uploadText">
                      {imageFile[0]?.name}
                    </div>
                  )}
                </span>
                <span className="imageFieldPosition">
                  <input
                    id="contained-button-file"
                    accept="image/*"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => setImageFile(e.target.files)}
                  />
                </span>
              </label>
              {imageValidate && (
                <Alert variant="outlined" severity="error">
                  "Oops!", "Image size should be less than 200 KB"
                </Alert>
              )}
            </Box>
            {/* submit button  */}
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </MainCard>
    </>
  );
};

export default AddBanner;
