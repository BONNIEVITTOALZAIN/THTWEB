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

export const namaPenyakit = [
  "CONTRACT ULCERS", "ABAES PARAFARINGEAL", "ABAES PERITONAILER", "BAROTITIS MEDIA",
  "DEVIASI SEPTUM", "FARINGITIS", "KANKER LARING", "KANKER LEHER DAN KEPALA",
  "KANKER LEHER METASTATIK", "KANKER NASOFARING", "KANKER TONSIL", "LARINGITIS",
  "NEURONITIS VESTIBULARIS", "OSTEOSKLEROSIS", "OTITIS MEDIA AKUT", "MENIERE",
  "TONSILITIS", "TUMOR SYARAF PENDENGARAN", "VERTIGO POSTULAR", "SINUSITIS MAKSILARIS",
  "SINUSITIS FRONTALIS", "SINUSITIS ETMOIDALIS", "SINUSITIS SFENOIDALIS", "PERUT"
];

export const gejalaPenyakit = {
  0: [2, 15], 1: [2, 18], 2: [0, 1, 6, 13, 15, 21], 3: [1, 5], 4: [0, 4, 5, 14, 24, 28],
  5: [0, 2, 6, 12, 13], 6: [2, 3, 6, 12, 15, 22, 23], 7: [2, 11, 14, 20, 29, 30],
  8: [11], 9: [5, 14], 10: [6, 11], 11: [0, 2, 13, 18, 36], 12: [9, 16],
  13: [19, 34], 14: [0, 5, 9, 31], 15: [5, 9, 33, 35], 16: [0, 1, 2, 3, 6, 9],
  17: [1, 19, 37], 18: [16], 19: [0, 1, 3, 4, 7, 8, 10, 27, 32],
  20: [0, 1, 3, 4, 7, 8, 10, 17], 21: [0, 1, 3, 4, 7, 8, 10, 17, 25, 26],
  22: [0, 1, 3, 4, 5, 7, 8, 10, 11], 23: [0, 1, 2, 3]
};

export function hitungDiagnosa(selected) {
  const kemungkinan = [];
  const akurat = [];
  const persentaseDiagnosa = [];

  const inputSet = new Set(selected);

  for (const id in gejalaPenyakit) {
    const gejala = gejalaPenyakit[id];
    const cocok = gejala.filter((g) => inputSet.has(g)).length;

    if (cocok) {
      kemungkinan.push(parseInt(id));
      persentaseDiagnosa.push({
        id: parseInt(id),
        persen: Math.round((cocok / gejala.length) * 100),
        cocok,
        total: gejala.length
      });

      if (cocok === gejala.length && selected.length === gejala.length) {
        const a = [...gejala].sort();
        const b = [...selected].sort();
        if (JSON.stringify(a) === JSON.stringify(b)) {
          akurat.push(parseInt(id));
        }
      }
    }
  }

  return { kemungkinan, akurat, persentaseDiagnosa };
}
