import { useEffect, useState } from "react";
import axios from "axios";

const PAGE_SIZE = 50;

const UserLogs = () => {
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

  useEffect(() => {
    if (!logTypeRequested) return;

    let isMounted = true;
    setLoading(true);
    setVisibleLogs([]);
    setVisibleLogsStart(0);
    setLinkedAccountFilter(""); // Reset filter when log type changes

    const fetchLogs = async () => {
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
      } catch (error) {
        if (!isMounted) return;
        console.error("Error fetching admin logs:", error);
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

    setVisibleLogs(selectedLogs);
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
      <div className="AdminMgmtWrapper">
        <p className="AdminMgmtActionHeading">User Logs</p>
        <span>
          (Choose the respective buttons given below to see either regular logs
          or error logs registered for user accounts.)
        </span>

        <div className="AdminMgmtActions">
          <div className="AdminConsoleInputsWrapper">
            {["Regular", "Error"].map((type) => (
              <div className="AdminMgmtInputWrapper" key={type}>
                <button
                  onClick={() => setLogTypeRequested(type)}
                  className="AddInputButtons"
                >
                  {type} Logs
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {loading && <div>Loading logs...</div>}

      {!loading && logTypeRequested && (
        <>
          <div className="LogDisplayWrapper">
            <div className="AdminsListHeading">
              <p className="AdminTableHeading">{logTypeRequested} Logs</p>
              <span>
                Total records currently:{" "}
                <span style={{ color: "red" }}>{totalRecords}</span>
              </span>
            </div>

            <div className="LogListSort">
              <div className="RegisterDropDown">
                <select
                  value={sortBy}
                  id="se-sortBy"
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setVisibleLogsStart(0);
                  }}
                >
                  <option value="DateNewest">Date: Newest First</option>
                  <option value="DateOldest">Date: Oldest First</option>
                  <option value="PriorityHighest">
                    Priority: Highest First
                  </option>
                  <option value="PriorityLowest">Priority: Lowest First</option>
                </select>
                <label htmlFor="se-sortBy" className="DropDownLabel">
                  Sort By
                </label>
              </div>
            </div>

            <div className="LogListFilter">
              <span onClick={toggleFilters}>
                Click to show/hide available filters
              </span>
            </div>

            {showFilters && (
              <>
                {" "}
                <div className="LogFilterWrapper">
                  <div className="AdminMgmtOtp">
                    <input
                      type="text"
                      placeholder=" "
                      value={linkedAccountFilter}
                      onChange={(e) => setLinkedAccountFilter(e.target.value)}
                    />
                    <label className="AdminMgmtTextFieldLabel2">
                      Linked Account
                    </label>
                  </div>
                  <div className="AdminMgmtOtp">
                    <input
                      type="text"
                      placeholder=" "
                      value={createdByFilter}
                      onChange={(e) => setCreatedByFilter(e.target.value)}
                    />
                    <label className="AdminMgmtTextFieldLabel2">
                      Created By
                    </label>
                  </div>
                  <div className="AdminMgmtOtp">
                    <input
                      type="text"
                      placeholder=" "
                      value={logFilter}
                      onChange={(e) => setLogFilter(e.target.value)}
                    />
                    <label className="AdminMgmtTextFieldLabel2">Log</label>
                  </div>
                </div>
                <button
                  onClick={applyFilterAndSort}
                  className="AddInputButtons"
                >
                  Filter
                </button>
              </>
            )}
          </div>
          {!loading && !visibleLogs.length && logTypeRequested && (
            <span style={{ margin: "2rem 0rem" }}>
              No logs found for this selection.
            </span>
          )}

          {!loading && visibleLogs.length > 0 && (
            <div className="LogDisplayWrapper">
              <div className="AdminsList">
                <table className="CurrentAdminsTable">
                  <thead>
                    <tr>
                      <th>Linked Account</th>
                      <th>Created By</th>
                      <th>Created At</th>
                      <th>Priority</th>
                      <th>Log</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleLogs.map((log) => (
                      <tr key={`${log.createdAt}-${log.logDetails}`}>
                        <td>{log.logLinkedAccount}</td>
                        <td>{log.logAddedBy}</td>
                        <td>{log.createdAtFormatted}</td>
                        <td>{log.logPriority}</td>
                        <td>{log.logDetails}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="LogsNavigation">
                <button
                  onClick={handlePrev}
                  className="LeftNavigationButtons"
                  disabled={visibleLogsStart === 0}
                >
                  Previous
                </button>

                <span>
                  Showing {totalRecords === 0 ? 0 : visibleLogsStart + 1} -{" "}
                  {Math.min(visibleLogsStart + PAGE_SIZE, totalRecords)} out of{" "}
                  {totalRecords} records.
                </span>

                <button
                  onClick={handleNext}
                  className="LeftNavigationButtons"
                  disabled={
                    visibleLogsStart + PAGE_SIZE >= totalRecords ||
                    totalRecords === 0
                  }
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default UserLogs;
