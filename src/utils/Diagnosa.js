// Daftar nama gejala yang digunakan dalam diagnosa
export const namaGejala = [
  "Demam", "Sakit kepala", "Nyeri saat bicara atau menelan", "Batuk", "Hidung tersumbat",
  "Nyeri telinga", "Nyeri tenggorokan", "Hidung meler", "Letih dan lesu", "Mual dan muntah",
  "Selaput lendir merah dan bengkak", "Ada benjolan di leher", "Nyeri leher", "Pembengkakan kelenjar getah bening",
  "Pendarahan hidung", "Suara serak", "Bola mata bergerak tanpa sadar", "Dahi sakit", "Leher bengkak",
  "Tuli", "Ada yang tumbuh di mulut", "Air liur menetes", "Berat badan turun", "Bunyi napas abnormal",
  "Infeksi sinus", "Nyeri antara mata", "Nyeri pinggir hidung", "Nyeri pipi di bawah mata", "Nyeri wajah",
  "Perubahan kulit", "Perubahan suara", "Radang gendang telinga", "Sakit gigi", "Serangan vertigo",
  "Telinga berdenging", "Telinga terasa penuh", "Tenggorokan gatal", "Tubuh tak seimbang"
];

// Daftar nama penyakit yang akan dicocokkan berdasarkan gejala
export const namaPenyakit = [
  "CONTRACT ULCERS", "ABAES PARAFARINGEAL", "ABAES PERITONAILER", "BAROTITIS MEDIA",
  "DEVIASI SEPTUM", "FARINGITIS", "KANKER LARING", "KANKER LEHER DAN KEPALA",
  "KANKER LEHER METASTATIK", "KANKER NASOFARING", "KANKER TONSIL", "LARINGITIS",
  "NEURONITIS VESTIBULARIS", "OSTEOSKLEROSIS", "OTITIS MEDIA AKUT", "MENIERE",
  "TONSILITIS", "TUMOR SYARAF PENDENGARAN", "VERTIGO POSTULAR", "SINUSITIS MAKSILARIS",
  "SINUSITIS FRONTALIS", "SINUSITIS ETMOIDALIS", "SINUSITIS SFENOIDALIS", "PERUT"
];

// Relasi antara penyakit dan daftar gejalanya (berdasarkan indeks namaGejala)
export const gejalaPenyakit = {
  0: [2, 15],              // CONTRACT ULCERS
  1: [2, 18],              // ABAES PARAFARINGEAL
  2: [0, 1, 6, 13, 15, 21],// ABAES PERITONAILER
  3: [1, 5],               // BAROTITIS MEDIA
  4: [0, 4, 5, 14, 24, 28],// DEVIASI SEPTUM
  5: [0, 2, 6, 12, 13],    // FARINGITIS
  6: [2, 3, 6, 12, 15, 22, 23], // KANKER LARING
  7: [2, 11, 14, 20, 29, 30],   // KANKER LEHER DAN KEPALA
  8: [11],                // KANKER LEHER METASTATIK
  9: [5, 14],             // KANKER NASOFARING
  10: [6, 11],            // KANKER TONSIL
  11: [0, 2, 13, 18, 36], // LARINGITIS
  12: [9, 16],            // NEURONITIS VESTIBULARIS
  13: [19, 34],           // OSTEOSKLEROSIS
  14: [0, 5, 9, 31],      // OTITIS MEDIA AKUT
  15: [5, 9, 33, 35],     // MENIERE
  16: [0, 1, 2, 3, 6, 9], // TONSILITIS
  17: [1, 19, 37],        // TUMOR SYARAF PENDENGARAN
  18: [16],               // VERTIGO POSTULAR
  19: [0, 1, 3, 4, 7, 8, 10, 27, 32], // SINUSITIS MAKSILARIS
  20: [0, 1, 3, 4, 7, 8, 10, 17],     // SINUSITIS FRONTALIS
  21: [0, 1, 3, 4, 7, 8, 10, 17, 25, 26], // SINUSITIS ETMOIDALIS
  22: [0, 1, 3, 4, 5, 7, 8, 10, 11],      // SINUSITIS SFENOIDALIS
  23: [0, 1, 2, 3]         // PERUT 
};

// Fungsi utama untuk menghitung diagnosa berdasarkan inputan gejala (selected)
export function hitungDiagnosa(selected) {
  const kemungkinan = []; // Menyimpan ID penyakit yang mungkin
  const akurat = [];      // Menyimpan ID penyakit yang cocok 100%
  const persentaseDiagnosa = []; // Menyimpan info persentase kecocokan tiap penyakit

  const inputSet = new Set(selected); // Konversi array input ke Set agar pencarian cepat

  // Iterasi setiap penyakit dan gejalanya
  for (const id in gejalaPenyakit) {
    const gejala = gejalaPenyakit[id];

    // Hitung berapa banyak gejala yang cocok dengan input user
    const cocok = gejala.filter((g) => inputSet.has(g)).length;

    // Jika ada kecocokan, berarti penyakit ini mungkin
    if (cocok) {
      kemungkinan.push(parseInt(id)); // Tambah ke array kemungkinan

      // Hitung dan simpan persentase kecocokan terhadap total gejala penyakit tersebut
      persentaseDiagnosa.push({
        id: parseInt(id),
        persen: Math.round((cocok / gejala.length) * 100),
        cocok, // jumlah gejala yang cocok
        total: gejala.length // total gejala penyakit
      });

      // Cek apakah input user 100% sama persis dengan daftar gejala penyakit (diagnosa akurat)
      if (cocok === gejala.length && selected.length === gejala.length) {
        const a = [...gejala].sort();   // urutkan gejala penyakit
        const b = [...selected].sort(); // urutkan input user

        // Jika semua elemen cocok dan urutannya juga sama, dianggap akurat
        if (JSON.stringify(a) === JSON.stringify(b)) {
          akurat.push(parseInt(id)); // Tambah ke list diagnosa akurat
        }
      }
    }
  }

  // Kembalikan hasil diagnosa: penyakit yang mungkin, yang akurat, dan persentase kecocokan
  return { kemungkinan, akurat, persentaseDiagnosa };
}
