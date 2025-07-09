import { useState } from "react";
import styles from "./Report.module.css";

function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [selectedMetric, setSelectedMetric] = useState("revenue");
  const [selectedFinancialView, setSelectedFinancialView] =
    useState("overview");

  // Enhanced metrics with financial data
  const metrics = [
    {
      title: "Total Revenue",
      value: "$124,563",
      change: "+12.5%",
      trend: "up",
      icon: "💰",
      category: "revenue",
    },
    {
      title: "Total Expenses",
      value: "$89,247",
      change: "+8.3%",
      trend: "up",
      icon: "💰",
      category: "expense",
    },
    {
      title: "Net Profit",
      value: "$35,316",
      change: "+18.2%",
      trend: "up",
      icon: "💵",
      category: "profit",
    },
    {
      title: "Active Members",
      value: "1,247",
      change: "+8.2%",
      trend: "up",
      icon: "👥",
      category: "members",
    },
    {
      title: "Utility Costs",
      value: "$12,450",
      change: "+5.1%",
      trend: "up",
      icon: "⚡",
      category: "utilities",
    },
    {
      title: "Employee Wages",
      value: "$45,800",
      change: "+3.2%",
      trend: "up",
      icon: "👷",
      category: "wages",
    },
  ];

  // Financial breakdown data
  const financialData = {
    revenue: {
      membership: 85000,
      personalTraining: 25000,
      equipmentRental: 8500,
      supplements: 5063,
    },
    expenses: {
      utilities: 12450,
      wages: 45800,
      rent: 18000,
      equipment: 8500,
      marketing: 3200,
      insurance: 2297,
    },
    utilities: {
      electricity: 6800,
      water: 2400,
      internet: 1800,
      maintenance: 1450,
    },
    wages: {
      trainers: 28000,
      receptionists: 12000,
      cleaners: 5800,
    },
  };

  const chartData = {
    revenue: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
    expenses: [8500, 12000, 9800, 15000, 13500, 18000, 16500],
    utilities: [1200, 1400, 1100, 1600, 1300, 1800, 1500],
    wages: [3200, 3800, 3500, 4200, 3900, 4500, 4200],
  };

  const recentActivities = [
    {
      type: "revenue",
      user: "Membership Renewal",
      time: "2 hours ago",
      amount: "$149",
    },
    {
      type: "expense",
      user: "Utility Payment",
      time: "4 hours ago",
      amount: "$1,200",
    },
    {
      type: "wage",
      user: "Trainer Payment",
      time: "6 hours ago",
      amount: "$2,800",
    },
    { type: "revenue", user: "New Member", time: "8 hours ago", amount: "$99" },
    {
      type: "expense",
      user: "Equipment Maintenance",
      time: "1 day ago",
      amount: "$450",
    },
    {
      type: "revenue",
      user: "Personal Training",
      time: "1 day ago",
      amount: "$120",
    },
  ];

  const monthlyTrends = [
    { month: "Jan", revenue: 85000, expenses: 72000, profit: 13000 },
    { month: "Feb", revenue: 92000, expenses: 78000, profit: 14000 },
    { month: "Mar", revenue: 88000, expenses: 75000, profit: 13000 },
    { month: "Apr", revenue: 95000, expenses: 80000, profit: 15000 },
    { month: "May", revenue: 102000, expenses: 85000, profit: 17000 },
    { month: "Jun", revenue: 124563, expenses: 89247, profit: 35316 },
  ];

  return (
    <div className={styles.analytics}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Analytics</h1>
          <p className={styles.subtitle}>
            Track your gym&apos;s financial performance and expenses
          </p>
        </div>
        <div className={styles.controls}>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className={styles.periodSelect}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* Enhanced Metrics Cards */}
      <div className={styles.metricsGrid}>
        {metrics.map((metric, index) => (
          <div
            key={index}
            className={`${styles.metricCard} ${styles[metric.category]}`}
          >
            <div className={styles.metricHeader}>
              <span className={styles.metricIcon}>{metric.icon}</span>
              <span className={`${styles.trend} ${styles[metric.trend]}`}>
                {metric.change}
              </span>
            </div>
            <h3 className={styles.metricValue}>{metric.value}</h3>
            <p className={styles.metricTitle}>{metric.title}</p>
          </div>
        ))}
      </div>

      {/* Financial Overview Section */}
      <div className={styles.financialSection}>
        <div className={styles.financialTabs}>
          <button
            className={`${styles.tabButton} ${
              selectedFinancialView === "overview" ? styles.active : ""
            }`}
            onClick={() => setSelectedFinancialView("overview")}
          >
            Overview
          </button>
          <button
            className={`${styles.tabButton} ${
              selectedFinancialView === "revenue" ? styles.active : ""
            }`}
            onClick={() => setSelectedFinancialView("revenue")}
          >
            Revenue Breakdown
          </button>
          <button
            className={`${styles.tabButton} ${
              selectedFinancialView === "expenses" ? styles.active : ""
            }`}
            onClick={() => setSelectedFinancialView("expenses")}
          >
            Expense Breakdown
          </button>
          <button
            className={`${styles.tabButton} ${
              selectedFinancialView === "utilities" ? styles.active : ""
            }`}
            onClick={() => setSelectedFinancialView("utilities")}
          >
            Utilities & Wages
          </button>
        </div>

        {selectedFinancialView === "overview" && (
          <div className={styles.overviewGrid}>
            <div className={styles.overviewCard}>
              <h3>Revenue Sources</h3>
              <div className={styles.breakdownList}>
                <div className={styles.breakdownItem}>
                  <span>Memberships</span>
                  <span>
                    ${financialData.revenue.membership.toLocaleString()}
                  </span>
                </div>
                <div className={styles.breakdownItem}>
                  <span>Personal Training</span>
                  <span>
                    ${financialData.revenue.personalTraining.toLocaleString()}
                  </span>
                </div>
                <div className={styles.breakdownItem}>
                  <span>Equipment Rental</span>
                  <span>
                    ${financialData.revenue.equipmentRental.toLocaleString()}
                  </span>
                </div>
                <div className={styles.breakdownItem}>
                  <span>Supplements</span>
                  <span>
                    ${financialData.revenue.supplements.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.overviewCard}>
              <h3>Major Expenses</h3>
              <div className={styles.breakdownList}>
                <div className={styles.breakdownItem}>
                  <span>Employee Wages</span>
                  <span>${financialData.expenses.wages.toLocaleString()}</span>
                </div>
                <div className={styles.breakdownItem}>
                  <span>Rent</span>
                  <span>${financialData.expenses.rent.toLocaleString()}</span>
                </div>
                <div className={styles.breakdownItem}>
                  <span>Utilities</span>
                  <span>
                    ${financialData.expenses.utilities.toLocaleString()}
                  </span>
                </div>
                <div className={styles.breakdownItem}>
                  <span>Equipment</span>
                  <span>
                    ${financialData.expenses.equipment.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedFinancialView === "revenue" && (
          <div className={styles.detailedBreakdown}>
            <div className={styles.revenueChart}>
              <h3>Revenue Breakdown</h3>
              <div className={styles.pieChart}>
                <div
                  className={styles.pieSegment}
                  style={{ "--percentage": "68%", "--color": "#4CAF50" }}
                >
                  <span>Memberships</span>
                  <span>68%</span>
                </div>
                <div
                  className={styles.pieSegment}
                  style={{ "--percentage": "20%", "--color": "#2196F3" }}
                >
                  <span>Personal Training</span>
                  <span>20%</span>
                </div>
                <div
                  className={styles.pieSegment}
                  style={{ "--percentage": "7%", "--color": "#FF9800" }}
                >
                  <span>Equipment Rental</span>
                  <span>7%</span>
                </div>
                <div
                  className={styles.pieSegment}
                  style={{ "--percentage": "5%", "--color": "#9C27B0" }}
                >
                  <span>Supplements</span>
                  <span>5%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedFinancialView === "expenses" && (
          <div className={styles.detailedBreakdown}>
            <div className={styles.expenseChart}>
              <h3>Expense Breakdown</h3>
              <div className={styles.expenseBars}>
                <div className={styles.expenseBar}>
                  <span>Wages</span>
                  <div className={styles.barContainer}>
                    <div
                      className={styles.bar}
                      style={{ width: "51%", backgroundColor: "#f44336" }}
                    ></div>
                  </div>
                  <span>51%</span>
                </div>
                <div className={styles.expenseBar}>
                  <span>Rent</span>
                  <div className={styles.barContainer}>
                    <div
                      className={styles.bar}
                      style={{ width: "20%", backgroundColor: "#ff9800" }}
                    ></div>
                  </div>
                  <span>20%</span>
                </div>
                <div className={styles.expenseBar}>
                  <span>Utilities</span>
                  <div className={styles.barContainer}>
                    <div
                      className={styles.bar}
                      style={{ width: "14%", backgroundColor: "#2196f3" }}
                    ></div>
                  </div>
                  <span>14%</span>
                </div>
                <div className={styles.expenseBar}>
                  <span>Equipment</span>
                  <div className={styles.barContainer}>
                    <div
                      className={styles.bar}
                      style={{ width: "10%", backgroundColor: "#9c27b0" }}
                    ></div>
                  </div>
                  <span>10%</span>
                </div>
                <div className={styles.expenseBar}>
                  <span>Other</span>
                  <div className={styles.barContainer}>
                    <div
                      className={styles.bar}
                      style={{ width: "5%", backgroundColor: "#607d8b" }}
                    ></div>
                  </div>
                  <span>5%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedFinancialView === "utilities" && (
          <div className={styles.utilitiesGrid}>
            <div className={styles.utilitiesCard}>
              <h3>Utility Breakdown</h3>
              <div className={styles.utilityList}>
                <div className={styles.utilityItem}>
                  <span>Electricity</span>
                  <span>
                    ${financialData.utilities.electricity.toLocaleString()}
                  </span>
                </div>
                <div className={styles.utilityItem}>
                  <span>Water</span>
                  <span>${financialData.utilities.water.toLocaleString()}</span>
                </div>
                <div className={styles.utilityItem}>
                  <span>Internet</span>
                  <span>
                    ${financialData.utilities.internet.toLocaleString()}
                  </span>
                </div>
                <div className={styles.utilityItem}>
                  <span>Maintenance</span>
                  <span>
                    ${financialData.utilities.maintenance.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.utilitiesCard}>
              <h3>Employee Wages</h3>
              <div className={styles.wageList}>
                <div className={styles.wageItem}>
                  <span>Personal Trainers</span>
                  <span>${financialData.wages.trainers.toLocaleString()}</span>
                </div>
                <div className={styles.wageItem}>
                  <span>Receptionists</span>
                  <span>
                    ${financialData.wages.receptionists.toLocaleString()}
                  </span>
                </div>
                <div className={styles.wageItem}>
                  <span>Cleaning Staff</span>
                  <span>${financialData.wages.cleaners.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Charts Section */}
      <div className={styles.chartsSection}>
        <div className={styles.chartContainer}>
          <div className={styles.chartHeader}>
            <h2>Financial Performance</h2>
            <div className={styles.chartControls}>
              <button
                className={`${styles.chartButton} ${
                  selectedMetric === "revenue" ? styles.active : ""
                }`}
                onClick={() => setSelectedMetric("revenue")}
              >
                Revenue
              </button>
              <button
                className={`${styles.chartButton} ${
                  selectedMetric === "expenses" ? styles.active : ""
                }`}
                onClick={() => setSelectedMetric("expenses")}
              >
                Expenses
              </button>
              <button
                className={`${styles.chartButton} ${
                  selectedMetric === "utilities" ? styles.active : ""
                }`}
                onClick={() => setSelectedMetric("utilities")}
              >
                Utilities
              </button>
              <button
                className={`${styles.chartButton} ${
                  selectedMetric === "wages" ? styles.active : ""
                }`}
                onClick={() => setSelectedMetric("wages")}
              >
                Wages
              </button>
            </div>
          </div>
          <div className={styles.chart}>
            <div className={styles.chartBars}>
              {chartData[selectedMetric].map((value, index) => (
                <div key={index} className={styles.barContainer}>
                  <div
                    className={styles.bar}
                    style={{
                      height: `${
                        (value / Math.max(...chartData[selectedMetric])) * 100
                      }%`,
                    }}
                  ></div>
                  <span className={styles.barLabel}>
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.recentActivity}>
          <h2>Recent Financial Activity</h2>
          <div className={styles.activityList}>
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className={`${styles.activityItem} ${styles[activity.type]}`}
              >
                <div className={styles.activityIcon}>
                  {activity.type === "revenue" && "💰"}
                  {activity.type === "expense" && "📉"}
                  {activity.type === "wage" && "👷"}
                </div>
                <div className={styles.activityContent}>
                  <p className={styles.activityUser}>{activity.user}</p>
                  <p className={styles.activityTime}>{activity.time}</p>
                </div>
                <div className={styles.activityAmount}>{activity.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className={styles.trendsSection}>
        <h2>Monthly Financial Trends</h2>
        <div className={styles.trendsGrid}>
          {monthlyTrends.map((trend, index) => (
            <div key={index} className={styles.trendCard}>
              <h3>{trend.month}</h3>
              <div className={styles.trendData}>
                <div className={styles.trendItem}>
                  <span>Revenue</span>
                  <span>${trend.revenue.toLocaleString()}</span>
                </div>
                <div className={styles.trendItem}>
                  <span>Expenses</span>
                  <span>${trend.expenses.toLocaleString()}</span>
                </div>
                <div className={styles.trendItem}>
                  <span>Profit</span>
                  <span className={styles.profit}>
                    ${trend.profit.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Analytics;
