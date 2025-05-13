import { useState } from 'react';
import { namaGejala, namaPenyakit, hitungDiagnosa } from '../utils/Diagnosa';
import Swal from 'sweetalert2';
import { FaCheckCircle } from 'react-icons/fa';

function DiagnosaPage() {
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleCheckbox = (index) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const diagnosa = () => {
    if (selected.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Peringatan!',
        text: 'Silakan pilih gejala terlebih dahulu!',
      });
      return;
    }
    const hasil = hitungDiagnosa(selected);
    setResult(hasil);
  };

  const reset = () => {
    setSelected([]);
    setResult(null);
    setSearchTerm("");
  };

  {/* Pencarian untuk gejala */}
  const filteredGejala = namaGejala
    .map((g, i) => ({ label: g, index: i }))
    .filter((g) => g.label.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-100 pt-28 p-4">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-blue-800 text-center">
          Diagnosa Penyakit THT
        </h1>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-3 text-gray-700">Pilih Gejala:</h2>

            <input
              type="text"
              placeholder="Cari gejala..."
              className="w-full mb-3 p-2 border border-gray-300 rounded-lg text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-2 max-h-[500px] overflow-y-auto pr-2">
              {filteredGejala.length > 0 ? (
                filteredGejala.map(({ label, index }) => (
                  <label key={index} className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      className="accent-blue-600 w-4 h-4"
                      checked={selected.includes(index)}
                      onChange={() => toggleCheckbox(index)}
                    />
                    <span>{index + 1}. {label}</span>
                  </label>
                ))
              ) : (
                <p className="col-span-2 text-gray-400 italic">Gejala tidak ditemukan.</p>
              )}
            </div>

            <div className="flex space-x-3 mt-4">
              <button
                className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
                onClick={diagnosa}
              >
                Diagnosa
              </button>
              <button
                className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition"
                onClick={reset}
              >
                Reset Gejala
              </button>
            </div>
          </div>

          {/* Kolom Hasil Diagnosa */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Hasil Diagnosa</h2>

            {!result ? (
              <p className="text-gray-500 italic">Belum ada hasil. Silakan pilih gejala dan klik "Diagnosa".</p>
            ) : result.persentaseDiagnosa.length === 0 ? (
              <p className="text-red-500 font-semibold">Tidak ditemukan kecocokan dengan penyakit manapun.</p>
            ) : (
              <div className="space-y-6">
                {result.akurat.length > 0 && (
                  <div className="bg-green-100 border border-green-400 p-4 rounded-lg flex items-center">
                    <FaCheckCircle className="text-green-600 text-xl mr-3" />
                    <span className="font-semibold text-green-700">
                      Diagnosa Akurat: {namaPenyakit[result.akurat[0]]}
                    </span>
                  </div>
                )}
                <div className="max-h-[400px] overflow-y-auto space-y-4">
                  {result.persentaseDiagnosa.map(({ id, persen }) => (
                    <div key={id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                      <div className="text-lg font-medium text-gray-700">
                        {namaPenyakit[id]} - {persen}% cocok
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full"
                          style={{ width: `${persen}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiagnosaPage;
