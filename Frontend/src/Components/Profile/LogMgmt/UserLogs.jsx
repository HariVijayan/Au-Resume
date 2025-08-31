import { useEffect, useState } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FilterListAltIcon from "@mui/icons-material/FilterListAlt";

const PAGE_SIZE = 50;

const UserLogs = () => {
  const [loadingAnim, setLoadingAnim] = useState(false);

  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [logsData, setLogsData] = useState({
    DateNewest: [],
    DateOldest: [],
    PriorityHighest: [],
    PriorityLowest: [],
  });
  const [visibleLogs, setVisibleLogs] = useState([]);
  const [visibleLogsStart, setVisibleLogsStart] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [logTypeRequested, setLogTypeRequested] = useState("");
  const [sortBy, setSortBy] = useState("DateNewest");

  const [showFilters, setShowFilters] = useState(false);

  const [linkedAccountFilter, setLinkedAccountFilter] = useState("");
  const [createdByFilter, setCreatedByFilter] = useState("");
  const [logFilter, setLogFilter] = useState("");

  const isAdmin = false;

  const [serverMessage, setServerMessage] = useState("");
  const [showServerMsg, setShowServerMsg] = useState(false);
  const [serverMsgType, setServerMsgType] = useState("error");

  useEffect(() => {
    if (!logTypeRequested) return;

    let isMounted = true;
    setLoading(true);
    setVisibleLogs([]);
    setVisibleLogsStart(0);
    setLinkedAccountFilter(""); // Reset filter when log type changes

    const fetchLogs = async () => {
      setLoadingAnim(true);
      setServerMessage("Processing your request...");
      setServerMsgType("info");
      setShowServerMsg(true);
      try {
        const response = await axios.post(
          "http://localhost:5000/admin/actions/logMgmt/getLogs",
          { isAdmin, logTypeRequested },
          { withCredentials: true }
        );
        if (!isMounted) return;
        const {
          timeSortedNewest = [],
          timeSortedOldest = [],
          prioritySortedHighest = [],
          prioritySortedLowest = [],
          totalRecords = 0,
        } = response.data;

        setLogsData({
          DateNewest: timeSortedNewest,
          DateOldest: timeSortedOldest,
          PriorityHighest: prioritySortedHighest,
          PriorityLowest: prioritySortedLowest,
        });
        setTotalRecords(totalRecords);
        setVisibleLogsStart(0);
        setLoadingAnim(false);
        setServerMessage("Logs fetched successfully");
        setServerMsgType("success");
        setShowServerMsg(true);
      } catch (error) {
        setLoadingAnim(false);
        if (!isMounted) return;
        setServerMessage(
          error.response?.data?.message || "Error fetching logs"
        );
        setServerMsgType("error");
        setShowServerMsg(true);
        setLogsData({
          DateNewest: [],
          DateOldest: [],
          PriorityHighest: [],
          PriorityLowest: [],
        });
        setTotalRecords(0);
        setVisibleLogs([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchLogs();

    return () => {
      isMounted = false;
    };
  }, [logTypeRequested]);

  const applyFilterAndSort = () => {
    let selectedLogs = logsData[sortBy] || [];

    if (linkedAccountFilter.trim() !== "") {
      selectedLogs = selectedLogs.filter((log) =>
        log.logLinkedAccount
          .toLowerCase()
          .includes(linkedAccountFilter.toLowerCase())
      );
    }

    if (createdByFilter.trim() !== "") {
      selectedLogs = selectedLogs.filter((log) =>
        log.logAddedBy.toLowerCase().includes(createdByFilter.toLowerCase())
      );
    }

    if (logFilter.trim() !== "") {
      selectedLogs = selectedLogs.filter((log) =>
        log.logDetails.toLowerCase().includes(logFilter.toLowerCase())
      );
    }

    setVisibleLogs(
      selectedLogs.slice(visibleLogsStart, visibleLogsStart + PAGE_SIZE)
    );
    setTotalRecords(selectedLogs.length);
  };

  useEffect(() => {
    applyFilterAndSort();
  }, [logsData, sortBy, visibleLogsStart]);

  const handlePrev = () =>
    setVisibleLogsStart((start) => Math.max(0, start - PAGE_SIZE));

  const handleNext = () =>
    setVisibleLogsStart((start) =>
      Math.min(start + PAGE_SIZE, Math.max(0, totalRecords - PAGE_SIZE))
    );

  const toggleFilters = () => setShowFilters((prev) => !prev);

  return (
    <>
      <Snackbar
        open={showServerMsg}
        autoHideDuration={5000}
        onClose={() => setShowServerMsg(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={() => setShowServerMsg(false)}
          severity={serverMsgType}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {serverMessage}
        </Alert>
      </Snackbar>
      <Box
        id="AdminActionsWrapper"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          margin: "2rem 0rem",
        }}
      >
        <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
          User Logs
        </Typography>
        <Typography sx={{ textAlign: "center" }}>
          (Choose the respective buttons given below to see either regular logs
          or error logs registered for user accounts.)
        </Typography>

        <Box
          id="LogType"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            margin: "2rem 0rem",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="contained"
            onClick={() => setLogTypeRequested("Regular")}
            size="large"
            loading={loadingAnim}
            loadingPosition="end"
            endIcon={<CheckCircleIcon />}
            sx={{
              margin: "2rem 0rem",
              textTransform: "none",
              backgroundColor: `${theme.palette.brown.main}`,
            }}
            padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
          >
            Regular Logs
          </Button>
          <Button
            variant="contained"
            onClick={() => setLogTypeRequested("Error")}
            size="large"
            loading={loadingAnim}
            loadingPosition="end"
            endIcon={<ErrorIcon />}
            sx={{
              margin: "2rem 0rem",
              textTransform: "none",
              backgroundColor: `${theme.palette.black.main}`,
            }}
            padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
          >
            Error Logs
          </Button>
        </Box>

        {loading && (
          <Typography textAlign={"center"}>Loading please wait...</Typography>
        )}

        {!loading && logTypeRequested && (
          <>
            <Box
              id="LogActionsWrapper"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                width: "100%",
                flexDirection: "column",
                margin: "2rem 0rem",
              }}
            >
              <Box
                id="LogActionsHeading"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  {logTypeRequested} Logs
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography>Total records currently:</Typography>
                  <Typography sx={{ color: "red", marginLeft: "1rem" }}>
                    {totalRecords}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  margin: "2rem 0rem",
                }}
                width={{ xs: "100%", md: "50%", lg: "40%" }}
              >
                <TextField
                  sx={{ width: "80%", margin: "2rem 0rem" }}
                  required
                  id="se-sortby"
                  select
                  label="Sort By"
                  defaultValue="DateNewest"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setVisibleLogsStart(0);
                  }}
                >
                  <MenuItem value={"DateNewest"}>Date: Newest First</MenuItem>
                  <MenuItem value={"DateOldest"}>Date: Oldest First</MenuItem>
                  <MenuItem value="PriorityHighest">
                    Priority: Highest First
                  </MenuItem>
                  <MenuItem value="PriorityLowest">
                    Priority: Lowest First
                  </MenuItem>
                </TextField>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  width: "100%",
                  margin: "2rem 0rem",
                }}
              >
                <Button
                  variant="outlined"
                  onClick={toggleFilters}
                  size="large"
                  endIcon={showFilters ? <VisibilityOff /> : <Visibility />}
                  sx={{
                    margin: "2rem 0rem",
                    textTransform: "none",
                  }}
                  padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
                >
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </Button>
              </Box>

              {showFilters && (
                <>
                  {" "}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      margin: "2rem 0rem",
                      flexWrap: "wrap",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        margin: "2rem 0rem",
                        flexWrap: "wrap",
                      }}
                      justifyContent={{ xs: "center", md: "space-evenly" }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                        width={{ xs: "100%", md: "50%", lg: "30%" }}
                      >
                        <TextField
                          sx={{ width: "80%", margin: "2rem 0rem" }}
                          required
                          id="inp-linkedAccount"
                          label="Linked Account"
                          value={linkedAccountFilter}
                          onChange={(e) =>
                            setLinkedAccountFilter(e.target.value)
                          }
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                        width={{ xs: "100%", md: "50%", lg: "30%" }}
                      >
                        <TextField
                          sx={{ width: "80%", margin: "2rem 0rem" }}
                          required
                          id="inp-createdBy"
                          label="Created By"
                          value={createdByFilter}
                          onChange={(e) => setCreatedByFilter(e.target.value)}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                        width={{ xs: "100%", md: "50%", lg: "30%" }}
                      >
                        <TextField
                          sx={{ width: "80%", margin: "2rem 0rem" }}
                          required
                          id="inp-log"
                          label="Log Value"
                          value={logFilter}
                          onChange={(e) => setLogFilter(e.target.value)}
                        />
                      </Box>
                    </Box>

                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={applyFilterAndSort}
                      size="large"
                      endIcon={<FilterListAltIcon />}
                      sx={{ margin: "2rem 0rem", textTransform: "none" }}
                      padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
                    >
                      Filter Logs
                    </Button>
                  </Box>
                </>
              )}

              {!loading && !visibleLogs.length && logTypeRequested && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Typography sx={{ margin: "2rem 0rem", textAlign: "center" }}>
                    No logs found for this selection.
                  </Typography>
                </Box>
              )}

              {!loading && visibleLogs.length > 0 && (
                <>
                  <TableContainer
                    component={Paper}
                    sx={{ width: "100%", overflowX: "auto" }}
                  >
                    <Table
                      stickyHeader
                      sx={{ minWidth: 650 }}
                      aria-label="logs table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell
                            align="center"
                            sx={{
                              border: `1px solid ${theme.palette.primary.main}`,
                              fontWeight: "bold",
                            }}
                          >
                            Linked Account
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              border: `1px solid ${theme.palette.primary.main}`,
                              fontWeight: "bold",
                            }}
                          >
                            Created By
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              border: `1px solid ${theme.palette.primary.main}`,
                              fontWeight: "bold",
                            }}
                          >
                            Created At
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              border: `1px solid ${theme.palette.primary.main}`,
                              fontWeight: "bold",
                            }}
                          >
                            Priority
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              border: `1px solid ${theme.palette.primary.main}`,
                              fontWeight: "bold",
                            }}
                          >
                            Log
                          </TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {visibleLogs.map((log) => (
                          <TableRow
                            key={`${log.createdAt}-${log.logDetails}`}
                            hover
                          >
                            <TableCell
                              align="center"
                              sx={{
                                border: `1px solid ${theme.palette.primary.main}`,
                              }}
                            >
                              {log.logLinkedAccount}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                border: `1px solid ${theme.palette.primary.main}`,
                              }}
                            >
                              {log.logAddedBy}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                border: `1px solid ${theme.palette.primary.main}`,
                              }}
                            >
                              {log.createdAtFormatted}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                border: `1px solid ${theme.palette.primary.main}`,
                              }}
                            >
                              {log.logPriority}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                border: `1px solid ${theme.palette.primary.main}`,
                              }}
                            >
                              {log.logDetails}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      width: "100%",
                      margin: "2rem 0rem",
                      flexWrap: "wrap",
                    }}
                    justifyContent={{ xs: "center", sm: "space-between" }}
                  >
                    <IconButton
                      aria-label="previous logs"
                      sx={{ color: theme.palette.black.main }}
                      onClick={handlePrev}
                      disabled={visibleLogsStart === 0}
                    >
                      <KeyboardDoubleArrowLeftIcon />
                    </IconButton>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography>
                        {totalRecords === 0 ? 0 : visibleLogsStart + 1} -{" "}
                        {Math.min(visibleLogsStart + PAGE_SIZE, totalRecords)}{" "}
                        of
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography sx={{ color: "red", marginLeft: "0.5rem" }}>
                          {totalRecords}
                        </Typography>

                        <Typography sx={{ marginLeft: "0.5rem" }}>
                          records.
                        </Typography>
                      </Box>
                    </Box>

                    <IconButton
                      aria-label="next logs"
                      sx={{ color: theme.palette.black.main }}
                      onClick={handleNext}
                      disabled={
                        visibleLogsStart + PAGE_SIZE >= totalRecords ||
                        totalRecords === 0
                      }
                    >
                      <KeyboardDoubleArrowRightIcon />
                    </IconButton>
                  </Box>
                </>
              )}
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default UserLogs;
