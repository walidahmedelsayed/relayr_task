import React from "react";
import "./CardView.css";

const CardView = ({ devices }) => {
  return (
    <ul className="readings-list">
      {devices.map((device) => (
        <li key={device.deviceId}>
          <div className="card">
            <div className="card-header">
              <div className="card-header-meta">
                {new Date(device.updatedAt).toLocaleString()}
              </div>
              <h3 className="card-header-title">{device.deviceName}</h3>
            </div>
            <div className="card-body">
              <div className="statistics">
                <div className="statistic">
                  <div className="statistic-label">Zip Code</div>
                  <div className="statistic-value">{device.zipCode}</div>
                </div>

                <div className="statistic">
                  <div className="statistic-label">Status</div>
                  <div className="statistic-value">
                    {device.active ? (
                      <span className="status-indicator status-indicator-active">
                        Active
                      </span>
                    ) : (
                      <span className="status-indicator status-indicator-inactive">
                        Inactive
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button type="button" className="btn" onClick={() => alert("ww")}>
                Toggle status
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
export default CardView;
