export { }
// 1. для значения минимального повышающий коэффициент
// 2. для проигрышей подряд повышающий коэффициент
// 3. для увеличенных ставок повышающий коэффициент
// 4. ставки 10 %, 25 % 50 - от депозита с повышающим коэффициентом
// 5. считать мат ожидание, шансы кости = 16, 67 %.При 1 к 5 это 0, а 1 к 4 это - 0, 17 где - то.При шансах кости в 20 % 1 к 4 это 0. Т.е.мне надо держать пользователя с учетом повыш коэф около 20% для иллюзии выигрыша. 
// Целесообразно уйти от(-1 / +4) к более высоким значениям, так там легче манипулировать с цифрами. (-1000/+4000) и опять же максимум это (-1000/+5000) 

// Вероятность 15%:

// E = 0.15 \times 4 + 0.85 \times (-1) = 0.6 - 0.85 = -0.25
// E=0.15×4+0.85×(−1)=0.6−0.85=−0.25
// Вероятность 16%:

// E = 0.16 \times 4 + 0.84 \times (-1) = 0.64 - 0.84 = -0.20
// E=0.16×4+0.84×(−1)=0.64−0.84=−0.20
// Вероятность 17%:

// E = 0.17 \times 4 + 0.83 \times (-1) = 0.68 - 0.83 = -0.15
// E=0.17×4+0.83×(−1)=0.68−0.83=−0.15
// Вероятность 18%:

// E = 0.18 \times 4 + 0.82 \times (-1) = 0.72 - 0.82 = -0.10
// E=0.18×4+0.82×(−1)=0.72−0.82=−0.10
// Вероятность 19%:

// E = 0.19 \times 4 + 0.81 \times (-1) = 0.76 - 0.81 = -0.05
// E=0.19×4+0.81×(−1)=0.76−0.81=−0.05
// Вероятность 20%:

// E = 0.20 \times 4 + 0.80 \times (-1) = 0.80 - 0.80 = 0
// E=0.20×4+0.80×(−1)=0.80−0.80=0