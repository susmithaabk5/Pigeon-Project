import React, { useState, useEffect } from "react";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import {
  MDBBtn,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";

function PigeonList() {
  const [data, setdata] = useState([]);
  const [dataLength, setdataLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [startPage, setstartPage] = useState(1);
  const [endPage, setEndPage] = useState(11);
  const [pageLimit] = useState(11);

  const loadPigeondata = async (start, end, increase) => {
    debugger;
    return await axios
      .get(`http://localhost:3002/pigeons?_start=${start}&_end=${end}`)
      .then((response) => {
        setdata(response.data);
        setCurrentPage(currentPage + increase);
        setstartPage(start + 1);
        setEndPage(end);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:3002/pigeons`)
      .then((response) => {
        setdataLength(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
    if (dataLength === 0) {
      loadPigeondata(currentPage, currentPage + pageLimit, 0);
    }
  }, []);
  const renderPagination = () => {
    if (currentPage === 0) {
      return (
        <MDBPagination>
          <MDBPaginationItem>
            <MDBPaginationLink>1</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              color="grey"
              onClick={() => {
                loadPigeondata(
                  (currentPage + 1) * pageLimit,
                  (currentPage + 2) * pageLimit,
                  1
                );
              }}
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else if (
      currentPage < dataLength / pageLimit - 1 &&
      data.length === pageLimit
    ) {
      return (
        <MDBPagination>
          <MDBPaginationItem>
            <MDBBtn
              color="grey"
              onClick={() => {
                loadPigeondata(
                  (currentPage - 1) * pageLimit,
                  currentPage * pageLimit,
                  -1
                );
              }}
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              color="grey"
              onClick={() => {
                loadPigeondata(
                  (currentPage + 1) * pageLimit,
                  (currentPage + 2) * pageLimit,
                  1
                );
              }}
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else {
      return (
        <MDBPagination>
          <MDBPaginationItem>
            <MDBBtn
              color="grey"
              onClick={() => {
                loadPigeondata(
                  (currentPage - 1) * pageLimit,
                  currentPage * pageLimit,
                  -1
                );
              }}
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
        </MDBPagination>
      );
    }
  };
  return (
    <div>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
        }}
      >
        <ListItem sx={{ color: "black" }}>
          <ListItemText
            sx={{ color: "black" }}
            secondaryTypographyProps={{ sx: { color: "black" } }}
            primaryTypographyProps={{
              fontSize: "20px",
              fontWeight: "bold",
            }}
            primary={`${startPage}-${endPage} out of ${dataLength} Pigeons`}
          />
        </ListItem>
        <Divider
          sx={{ borderBottomWidth: 8, borderColor: "#2B248E" }}
          component="li"
        />
        {data.map((item, index) => {
          return (
            <>
              <ListItem sx={{ color: "black" }} key={index}>
                <ListItemText
                  key={index}
                  sx={{ color: "black" }}
                  secondaryTypographyProps={{ sx: { color: "black" } }}
                  primaryTypographyProps={{
                    fontWeight: "bold",
                  }}
                  primary={item.Pigeon}
                  secondary={`${item.Pos} Breeder: ${item.Breeder}  Sex:${item.Sex}  Speed:${item.Speed}  Arrival:${item.Arrival}`}
                />
              </ListItem>
              <Divider component="li" />
            </>
          );
        })}
      </List>
      <div className="pagination">{renderPagination()}</div>
    </div>
  );
}

export default PigeonList;
