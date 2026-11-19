import { useState } from 'react';
import './PriceRangeFilter.css';
import { PRICE_PRESETS } from '../services/productApi';

// 1500000 -> "1.500.000"
const formatNumber = (n) => Number(n).toLocaleString('vi-VN');
// "1.500.000đ" -> 1500000
const parseNumber = (text) => Number(String(text).replace(/\D/g, '')) || 0;

function PriceRangeFilter({ max, step = 100000, value, onChange }) {
  const [expanded, setExpanded] = useState(true);

  // Khoảng tự chọn
  const isCustom = Boolean(value && !value.presets);
  const low = isCustom ? value.min : 0;
  const high = isCustom ? value.max : max;

  // Chữ gõ trong ô nhập
  const [typing, setTyping] = useState(null);

  const presets = value && value.presets ? value.presets : [];
  const isAll = !value;

  const selectAll = () => onChange(null);

  const togglePreset = (preset) => {
    const next = presets.includes(preset)
      ? presets.filter((p) => p !== preset)
      : [...presets, preset];
    onChange(next.length ? { presets: next } : null);
  };


  const applyCustom = (min, max2) => {
    const a = Math.max(0, Math.min(min, max2));
    const b = Math.min(max, Math.max(min, max2));

    onChange(a <= 0 && b >= max ? null : { min: a, max: b });
  };

  const onSlideMin = (e) => applyCustom(Math.min(Number(e.target.value), high - step), high);
  const onSlideMax = (e) => applyCustom(low, Math.max(Number(e.target.value), low + step));

  const commitTyping = () => {
    if (!typing) return;
    const n = Math.min(parseNumber(typing.text), max);
    if (typing.field === 'min') applyCustom(n, high);
    else applyCustom(low, n);
    setTyping(null);
  };

  const inputProps = (field, current) => ({
    id: `price-${field}`,
    type: 'text',
    inputMode: 'numeric',
    value:
      typing && typing.field === field
        ? typing.text
        : `${formatNumber(current)}đ`,
    onFocus: (e) => e.target.select(),
    onChange: (e) => {
      const n = parseNumber(e.target.value);
      setTyping({ field, text: e.target.value === '' ? '' : formatNumber(n) });
    },
    onBlur: commitTyping,
    onKeyDown: (e) => {
      if (e.key === 'Enter') e.target.blur();
    },
  });

  // Vị trí đoạn màu trên thanh kéo (%)
  const leftPct = (low / max) * 100;
  const rightPct = 100 - (high / max) * 100;

  return (
    <div className="prf">
      <button
        type="button"
        className="prf-header"
        onClick={() => setExpanded((x) => !x)}
        aria-expanded={expanded}
      >
        <span>Mức giá</span>
        <span className={`prf-chevron ${expanded ? '' : 'is-collapsed'}`} aria-hidden="true" />
      </button>

      {expanded && (
        <div className="prf-body">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="price-all"
              checked={isAll}
              onChange={selectAll}
            />
            <label className="form-check-label" htmlFor="price-all">
              Tất cả
            </label>
          </div>
          {PRICE_PRESETS.map((r) => (
            <div className="form-check" key={r.value}>
              <input
                className="form-check-input"
                type="checkbox"
                id={`price-${r.value}`}
                checked={presets.includes(r.value)}
                onChange={() => togglePreset(r.value)}
              />
              <label className="form-check-label" htmlFor={`price-${r.value}`}>
                {r.label}
              </label>
            </div>
          ))}

          <p className="prf-custom-title">Hoặc chọn mức giá phù hợp với bạn:</p>

          <div className="prf-inputs">
            <input className="prf-input" aria-label="Giá thấp nhất" {...inputProps('min', low)} />
            <span className="prf-dash">~</span>
            <input className="prf-input" aria-label="Giá cao nhất" {...inputProps('max', high)} />
          </div>

          <div className="prf-slider">
            <div className="prf-track">
              <div
                className="prf-range"
                style={{ left: `${leftPct}%`, right: `${rightPct}%` }}
              />
            </div>
            <input
              type="range"
              min={0}
              max={max}
              step={step}
              value={low}
              onChange={onSlideMin}
              aria-label="Kéo chọn giá thấp nhất"

              style={{ zIndex: low > max - step * 2 ? 5 : 3 }}
            />
            <input
              type="range"
              min={0}
              max={max}
              step={step}
              value={high}
              onChange={onSlideMax}
              aria-label="Kéo chọn giá cao nhất"
              style={{ zIndex: 4 }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default PriceRangeFilter;
