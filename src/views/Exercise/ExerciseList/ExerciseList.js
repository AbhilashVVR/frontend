import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import config from "config";
import format from "date-fns/format";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import MainCard from "ui-component/cards/MainCard";
import MainTable from "ui-component/table/Maintable";

const ExerciseList = () => {
  const navigate = useNavigate();
  const [exerciseList, setExerciseList] = React.useState([]);
  const [subCategory, setSubCategory] = React.useState([]);
  const [isUpdated, setIsUpdated] = React.useState(false);
  React.useEffect(() => {
    fetch(`${config.apiServer}/category/getAllCategory`)
      .then((res) => res.json())
      .then((data) => {
        data.map((item) => {
          return fetch(
            `${config.apiServer}/category/getAllSubCategories/${item?.id}`
          )
            .then((res) => res.json())
            .then((data) => {
              setSubCategory((prevState) => [...prevState, data]);
            });
        });
        setExerciseList(data);
      })
      .catch((err) => {});
  }, [isUpdated]);
// console.log(subCategory);
  const enableDisable = (id) => {
    fetch(`${config.apiServer}/category/${id}/enableDisable`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          setIsUpdated(!isUpdated);
          swal(`Update successful`, "", "success");
        }
      });
  };

  const tempData = exerciseList?.map((exercise, index) => {
    const temp = {
      serialNo: index + 1,
      categoryName: exercise?.categoryName,

      subcategory: (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sub Category</InputLabel>
          <Select
            id="demo-simple-select-label"
            label="Sub Category"
            placeholder="Select-Sub-Category"
            defaultValue={subCategory?.subCategoryName || ""}
          >
            {subCategory[index]?.map((sc) => (
              <MenuItem
                onClick={() =>
                  navigate(
                    `/admin/exercise/exercise-list/edit-exercise-sub/${sc?.id}`
                  )
                }
                key={sc?.id}
                value={sc?.subCategoryName}
              >
                {sc?.subCategoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ),
      createdAt: format(new Date(exercise.createdAt), "dd-MM-yyyy"),
      action: (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <span>
            <Switch
              onClick={() => enableDisable(exercise?.id)}
              {...(exercise?.isEnabled
                ? { checked: true }
                : { checked: false })}
              color="secondary"
            />{" "}
            {exercise.isEnabled ? "Enable" : "Disable"}
          </span>
          <Link
            to={`editCategory/${exercise?.id}`}
            style={{ textDecoration: "none" }}
          >
            <Button variant="contained" color="secondary">
              Edit Category
            </Button>
          </Link>
        </Box>
      ),
    };
    return temp;
  });

  return (
    <MainCard title="Exercise List">
      <MainTable
        data={tempData}
        titles={[
          "SL. No.",
          "Category Name",
          "Sub-Category",
          "Created Data",
          "Action",
        ]}
      />
    </MainCard>
  );
};

export default ExerciseList;
