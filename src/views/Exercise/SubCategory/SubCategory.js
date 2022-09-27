import {
    Button,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import config from "config";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import MainCard from "ui-component/cards/MainCard";
import "../../Banner/index.css";

const SubCategory = () => {
    let params = useParams();
    const navigate = useNavigate();
    const [singleSubCategory, setSingleSubCategory] = useState({});
    const [FileUpload, setFileUpload] = useState(null);
    const [gradeValue, setGradeValue] = useState("");
    const formData = new FormData();
    const Grade = singleSubCategory?.subCategoryGrades;

    useEffect(() => {
        fetch(
            `${config.apiServer}/category/getSubCategory/${params.subExerciseID}`
        )
            .then((res) => res.json())
            .then((data) => {
                setSingleSubCategory(data);
            });
    }, [params.subExerciseID]);

    const handleSubCategoryForm = (e) => {
        e.preventDefault();
        formData.append("file_path", FileUpload[0]);
        formData.append("subCategoryName", singleSubCategory.subCategoryName);
        formData.append("grade", gradeValue);

        fetch(`${config.apiServer}/category/uploadCategory`, {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            swal("Successfully created", "", "success").then(() => {
              navigate("/admin/exercise/exercise-list");
            });
          })
          .catch((error) => {
            swal("Error!", "Something went wrong", "wrong");
          });
    };

    return (
      <MainCard title="Sub-Category">
        <form onSubmit={handleSubCategoryForm}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12} md={12}>
              <InputLabel sx={{ mb: 2 }} id="demo-simple-">
                Sub-Category Name
              </InputLabel>
              <TextField
                id="demo-simple-"
                name="subCategoryName"
                style={{ width: "100%", marginBottom: "20px" }}
                color="secondary"
                type="text"
                value={singleSubCategory?.subCategoryName}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <InputLabel sx={{ mb: 2 }} id="demo-simple-select-label">
                Grade
              </InputLabel>
              <Select
                
                placeholder="Select-Grade"
                value={gradeValue || ""}
                onChange={(e) => setGradeValue(e.target.value)}
                style={{ width: "100%", marginBottom: "20px" }}
                color="secondary"
                required
              >
                {Grade?.map((grade, index) => (
                  <MenuItem key={index} value={grade}>
                    {grade}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={12}>
              <InputLabel sx={{ mb: 2 }} id="question">
                Import Questions
              </InputLabel>
              <label htmlFor="Import Questions">
                <span className="FlexButton">
                  {!FileUpload ? (
                    <div className="FlexButton_uploadText">
                      <Button variant="contained" component="span">
                        Upload Files
                      </Button>
                    </div>
                  ) : (
                    <div className="FlexButton_uploadText">
                      {FileUpload[0]?.name}
                    </div>
                  )}
                </span>
                <span className="imageFieldPosition">
                  <input
                    id="Import Questions"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => setFileUpload(e.target?.files)}
                    required
                    accept=".csv"
                  />
                </span>
              </label>
            </Grid>
          </Grid>
          {FileUpload && gradeValue ? (
            <Button variant="contained" color="secondary" type="submit">
              Submit
            </Button>
          ) : (
            <Button variant="contained" color="secondary" disabled>
              Submit
            </Button>
          )}
        </form>
      </MainCard>
    );
};

export default SubCategory;
