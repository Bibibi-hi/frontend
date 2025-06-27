import React, { useState } from 'react';
import './App.css';

function App() {
  const [province, setProvince] = useState('');
  const [risk, setRisk] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);

  const handleCheck = async () => {
    try {
      const response = await fetch('https://backend-id2g.onrender.com/api/check-risk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ province }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Lỗi không xác định');
      }

      setRisk(data.risk);
      setForecast(Array.isArray(data.forecast) ? data.forecast : []);
      setError(null);
    } catch (err) {
      console.error('Lỗi:', err.message);
      setError(err.message);
      setRisk(null);
      setForecast([]);
    }
  };

  return (
    <div className="background">
      <div className="app-container">
        <div className="input-section">
          <h1>🚛 Đánh giá nguy cơ vận tải</h1>

          <div className="select-check">
            <select value={province} onChange={(e) => setProvince(e.target.value)}>
              <option value="">Chọn tỉnh thành</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
              <option value="Cần Thơ">Cần Thơ</option>
              <option value="Bắc Ninh">Bắc Ninh</option>
              <option value="Bến Tre">Bến Tre</option>
              <option value="Bình Dương">Bình Dương</option>
              <option value="Bình Định">Bình Định</option>
              <option value="Bình Phước">Bình Phước</option>
              <option value="Bình Thuận">Bình Thuận</option>
              <option value="Cà Mau">Cà Mau</option>
              <option value="Cao Bằng">Cao Bằng</option>
              <option value="Đắk Lắk">Đắk Lắk</option>
              <option value="Đắk Nông">Đắk Nông</option>
              <option value="Điện Biên">Điện Biên</option>
              <option value="Đồng Nai">Đồng Nai</option>
              <option value="Đồng Tháp">Đồng Tháp</option>
              <option value="Gia Lai">Gia Lai</option>
              <option value="Hà Giang">Hà Giang</option>
              <option value="Hà Nam">Hà Nam</option>
              <option value="Hà Tĩnh">Hà Tĩnh</option>
              <option value="Hải Dương">Hải Dương</option>
              <option value="Hải Phòng">Hải Phòng</option>
              <option value="Hậu Giang">Hậu Giang</option>
              <option value="Hòa Bình">Hòa Bình</option>
              <option value="Hưng Yên">Hưng Yên</option>
              <option value="Khánh Hòa">Khánh Hòa</option>
              <option value="Kiên Giang">Kiên Giang</option>
              <option value="Kon Tum">Kon Tum</option>
              <option value="Lai Châu">Lai Châu</option>
              <option value="Lâm Đồng">Lâm Đồng</option>
              <option value="Lạng Sơn">Lạng Sơn</option>
              <option value="Lào Cai">Lào Cai</option>
              <option value="Long An">Long An</option>
              <option value="Nam Định">Nam Định</option>
              <option value="Nghệ An">Nghệ An</option>
              <option value="Ninh Bình">Ninh Bình</option>
              <option value="Ninh Thuận">Ninh Thuận</option>
              <option value="Phú Thọ">Phú Thọ</option>
              <option value="Phú Yên">Phú Yên</option>
              <option value="Quảng Bình">Quảng Bình</option>
              <option value="Quảng Nam">Quảng Nam</option>
              <option value="Quảng Ngãi">Quảng Ngãi</option>
              <option value="Quảng Ninh">Quảng Ninh</option>
              <option value="Quảng Trị">Quảng Trị</option>
              <option value="Sóc Trăng">Sóc Trăng</option>
              <option value="Sơn La">Sơn La</option>
              <option value="Tây Ninh">Tây Ninh</option>
              <option value="Thái Bình">Thái Bình</option>
              <option value="Thái Nguyên">Thái Nguyên</option>
              <option value="Thanh Hóa">Thanh Hóa</option>
              <option value="Thừa Thiên Huế">Thừa Thiên Huế</option>
              <option value="Tiền Giang">Tiền Giang</option>
              <option value="Trà Vinh">Trà Vinh</option>
              <option value="Tuyên Quang">Tuyên Quang</option>
              <option value="Vĩnh Long">Vĩnh Long</option>
              <option value="Vĩnh Phúc">Vĩnh Phúc</option>
              <option value="Yên Bái">Yên Bái</option>
            </select>
            <button onClick={handleCheck}>Kiểm tra</button>
          </div>

          {error && <p className="error">❌ {error}</p>}

          {risk && (
            <p className="result">
              Mức độ nguy cơ: <strong>{risk}</strong>
            </p>
          )}
        </div>

        {forecast.length > 0 && (
          <div className="forecast">
            <h3>Dự báo thời tiết 7 ngày:</h3>
            <ul>
              {forecast.map((day, index) => (
                <li key={index}>
                  <strong>{day.date}:</strong> {day.description}, {day.temperature}°C, mưa {day.precipitation}mm
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
