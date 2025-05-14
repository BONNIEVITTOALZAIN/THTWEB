import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, MoonIcon, SunIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Logo from './assets/logo.png';
import './App.css';
import DiagnosaPage from './Page/DiagnosaPage';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Diagnosa', href: '/diagnosa' },
];

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        {/* Header */}
        <header className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <Link to="/" className="flex items-center space-x-2">
              <img src={Logo} alt="THT Logo" className="h-10 w-auto" />
              <span className="text-lg font-bold hidden sm:inline">THT Diagnostic</span>
            </Link>

            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} hover:text-indigo-600 transition-colors`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="#about"
                onClick={() => {
                  const section = document.getElementById('about');
                  section?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} hover:text-indigo-600 transition-colors`}
              >
                About
              </Link>

              <button
                onClick={toggleDarkMode}
                className="w-full p-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                {darkMode ? (
                  <SunIcon className="h-6 w-6 text-yellow-500" />
                ) : (
                  <MoonIcon className="h-6 w-6 text-gray-800" />
                )}
              </button>
            </div>

            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </nav>

          <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
            <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
            <DialogPanel className={`fixed inset-y-0 right-0 z-50 w-80 px-6 py-6 shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-center justify-between mb-6">
                <Link to="/" className="flex items-center space-x-2">
                  <img src={Logo} alt="Logo" className="h-8 w-auto" />
                  <span className={`text-lg font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>THT Diagnostic</span>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
                >
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block text-base font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} hover:text-indigo-600 transition duration-200`}
                  >
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={toggleDarkMode}
                  className="w-full p-2 mt-4 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  {darkMode ? (
                    <SunIcon className="h-6 w-6 text-yellow-500" />
                  ) : (
                    <MoonIcon className="h-6 w-6 text-gray-800" />
                  )}
                </button>
              </div>
            </DialogPanel>
          </Dialog>
        </header>

        {/* Main Content */}
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div className="relative isolate px-6 pt-24 lg:px-8">
                    <div className="mx-auto max-w-2xl py-24 sm:py-32 text-center">
                      <h1 className="text-5xl font-semibold sm:text-7xl text-indigo-600">
                        THT Diagnostic Center
                      </h1>
                      <p className={`mt-8 text-lg  ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                        Pusat Diagnosa Penyakit THT dengan teknologi mutakhir dan tim ahli terampil untuk memastikan perawatan terbaik.
                      </p>
                      <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                          to="/diagnosa"
                          className={`rounded-md bg-indigo-600 px-4 py-2.5 text-sm text-white shadow hover:bg-indigo-500`}
                        >
                          Mulai Diagnosa
                        </Link>
                        <a
                          href="#about"
                          className={`text-sm font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}
                          onClick={(e) => {
                            e.preventDefault();
                            const section = document.getElementById('about');
                            section?.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          pengetahuan lebih banyak →
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* About Section */}
                  <section id="about" className={darkMode ? "bg-gray-800 py-16" : "bg-gray-100 py-16"}>
                    <div className="mx-auto max-w-7xl text-center">
                      <h2 className={darkMode ? "text-3xl font-semibold text-gray-100 mb-10" : "text-3xl font-semibold text-gray-900 mb-10 "}>Tentang Penyakit THT</h2>
                      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 px-4">
                        {/* Telinga */}
                        <div className="bg-white rounded-xl shadow-md p-6 text-left">
                          <h3 className="text-xl font-semibold text-indigo-600">Penyakit Telinga</h3>
                          <p className="mt-4 text-gray-600">
                            Penyakit telinga meliputi gangguan pendengaran, infeksi telinga, dan keseimbangan. Contohnya:
                          </p>
                          <ul className="list-disc pl-5 mt-2 text-gray-600">
                            <li><strong>Otitis Media Akut:</strong> Infeksi pada telinga tengah yang menyebabkan nyeri dan demam.</li>
                            <li><strong>Barotitis Media:</strong> Cedera akibat perubahan tekanan udara, sering dialami saat naik pesawat.</li>
                            <li><strong>Meniere:</strong> Gangguan telinga dalam yang menyebabkan vertigo, tinnitus, dan gangguan pendengaran.</li>
                            <li><strong>Tumor Saraf Pendengaran:</strong> Pertumbuhan abnormal di saraf pendengaran yang bisa memengaruhi keseimbangan dan pendengaran.</li>
                          </ul>
                        </div>

                        {/* Hidung */}
                        <div className="bg-white rounded-xl shadow-md p-6 text-left">
                          <h3 className="text-xl font-semibold text-indigo-600">Penyakit Hidung</h3>
                          <p className="mt-4 text-gray-600">
                            Masalah hidung sering berkaitan dengan pernapasan dan infeksi. Contoh umum:
                          </p>
                          <ul className="list-disc pl-5 mt-2 text-gray-600">
                            <li><strong>Sinusitis:</strong> Peradangan pada sinus, dapat menyebabkan nyeri wajah, hidung tersumbat, dan demam.</li>
                            <li><strong>Deviasi Septum:</strong> Penyimpangan septum hidung yang dapat menghambat aliran udara.</li>
                            <li><strong>Rinitis Alergi:</strong> Reaksi alergi terhadap debu atau serbuk sari yang menyebabkan bersin dan hidung meler.</li>
                            <li><strong>Kanker Nasofaring:</strong> Tumor ganas di bagian belakang hidung yang memerlukan deteksi dini.</li>
                          </ul>
                        </div>

                        {/* Tenggorokan */}
                        <div className="bg-white rounded-xl shadow-md p-6 text-left">
                          <h3 className="text-xl font-semibold text-indigo-600">Penyakit Tenggorokan</h3>
                          <p className="mt-4 text-gray-600">
                            Tenggorokan rawan infeksi dan gangguan suara. Contohnya:
                          </p>
                          <ul className="list-disc pl-5 mt-2 text-gray-600">
                            <li><strong>Faringitis:</strong> Radang faring yang menyebabkan nyeri saat menelan dan demam.</li>
                            <li><strong>Tonsilitis:</strong> Infeksi amandel yang ditandai dengan pembengkakan dan nyeri tenggorokan.</li>
                            <li><strong>Laringitis:</strong> Peradangan pita suara yang menyebabkan suara serak atau hilang.</li>
                            <li><strong>Kanker Laring:</strong> Kanker pita suara yang berisiko pada perokok berat atau pengguna alkohol.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>
                  {/* FAQ Section */}
                  <section id="faq" className={darkMode ? "bg-gray-900 py-16" : "bg-white py-16"}>
                    <div className="max-w-4xl mx-auto px-6">
                      <h2 className={darkMode ? "text-3xl font-semibold text-gray-100 mb-10 text-center" : "text-3xl font-semibold text-gray-900 mb-10 text-center"}>
                        Pertanyaan Umum (FAQ)
                      </h2>
                      <div className="space-y-6">
                        {/* Pertanyaan 1 */}
                        <details className={`${darkMode ? "bg-gray-800" : "bg-gray-100"} p-6 rounded-xl shadow group`}>
                          <summary className="text-lg font-semibold text-indigo-600 cursor-pointer focus:outline-none group-open:mb-2">
                            Bagaimana sistem diagnosa ini bekerja?
                          </summary>
                          <p className={darkMode ? "mt-2 text-gray-300" : "mt-2 text-gray-700"}>
                            Sistem ini menggunakan pemilihan gejala yang Anda alami dan mencocokkannya dengan basis data penyakit THT.
                            Algoritma akan menghitung kemungkinan penyakit berdasarkan gejala yang dipilih untuk memberikan hasil yang paling relevan dan juga bisa di sebut dengan Sistem Pakar.
                          </p>
                        </details>

                        {/* Pertanyaan 2 */}
                        <details className={`${darkMode ? "bg-gray-800" : "bg-gray-100"} p-6 rounded-xl shadow group`}>
                          <summary className="text-lg font-semibold text-indigo-600 cursor-pointer focus:outline-none group-open:mb-2">
                            Apakah ini menggantikan konsultasi dokter?
                          </summary>
                          <p className={darkMode ? "mt-2 text-gray-300" : "mt-2 text-gray-700"}>
                            Tidak. Sistem ini hanya memberikan estimasi awal berdasarkan gejala.
                            Untuk diagnosis dan penanganan lebih lanjut, tetap disarankan untuk berkonsultasi langsung dengan dokter spesialis THT.
                          </p>
                        </details>

                        {/* Pertanyaan 3 */}
                        <details className={`${darkMode ? "bg-gray-800" : "bg-gray-100"} p-6 rounded-xl shadow group`}>
                          <summary className="text-lg font-semibold text-indigo-600 cursor-pointer focus:outline-none group-open:mb-2">
                            Apakah hasilnya akurat?
                          </summary>
                          <p className={darkMode ? "mt-2 text-gray-300" : "mt-2 text-gray-700"}>
                            Hasil diagnosa memiliki tingkat akurasi yang baik berdasarkan data yang dimasukkan.
                            Namun, akurasi sangat bergantung pada kelengkapan dan ketepatan gejala yang Anda pilih.
                          </p>
                        </details>
                      </div>
                    </div>
                  </section>
                </>
              }
            />
            {/* Diagnosa Page */}
            <Route path="/diagnosa" element={<DiagnosaPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className={`bg-gray-800 ${darkMode ? 'text-gray-200' : 'text-white'} py-8`}>
          <div className="text-center">
            <p>&copy; 2025 THT Diagnostic Center. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
