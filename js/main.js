var app = new Vue({
    el: '#app',
    data: {
        birth_year: 1950,
        birth_month: 1,
        birth_day: 1,
        birth_date: null,
        sex: 0,

        fiscal_year: null,
        fiscal_month: null,
        
        nine_star_year: 1,
        nine_star_month: 1,
        nine_star_ki_month: 1,

        oriental_zodiac_number: null,

        upper_gua: 1,
        lower_gua: 1,
    },

    created: function() {
        this.birth_date = this.birthDate
    },

    watch: {
        birth_year: function() {
            this.birth_date = this.birthDate
        },
        birth_month: function() {
            this.birth_date = this.birthDate
        },
        birth_day: function() {
            this.birth_date = this.birthDate
        },
        birth_date: function() {
            this.fiscal_year = this.fiscalYear(this.birth_date);
            this.fiscal_month = this.fiscalMonth(this.birth_date);
        },
        fiscal_year: function() {
            this.nine_star_year = this.nineStarYear(this.fiscal_year);
            this.oriental_zodiac_number = this.orientalZodiacNumber(this.fiscal_year)
        },
        fiscal_month: function() {
            this.nine_star_month = this.nineStarMonth(this.nine_star_year, this.fiscal_month);
        },
        nine_star_month: function() {
            this.nine_star_ki_month = this.nineStarKiMonth(this.nine_star_year, this.nine_star_month, this.sex);
            this.upper_gua = this.nineStarToBaguaNumber(this.nine_star_month, this.sex)
            this.lower_gua = this.nineStarToBaguaNumber(this.nine_star_year, this.sex)
        },
        sex: function() {
            this.nine_star_ki_month = this.nineStarKiMonth(this.nine_star_year, this.nine_star_month, this.sex);
            this.upper_gua = this.nineStarToBaguaNumber(this.nine_star_month, this.sex)
            this.lower_gua = this.nineStarToBaguaNumber(this.nine_star_year, this.sex)
        }
    },

    computed: {
        currentYear: function() {
            return (new Date).getFullYear();
        },
        birthDate: function() {
            let str = this.birth_year + '-' + ('0' + this.birth_month).slice(-2) + '-' + ('0' + this.birth_day).slice(-2) + 'GMT00:00:00.000Z'
            return new Date(str) 
        },
        tenHeavenlyStemChar: function() {
            return this.tenHeavenlyStemHash[this.tenHeavenlyStemNumber(this.fiscal_year)];
        },
        orientalZodiacChar: function() {
            return this.orientalZodiacNameHash[this.oriental_zodiac_number];
        },
        orientalZodiacTenHeavenlySteamName: function() {
            return this.orientalZodiacTenHeavenlySteamNames[this.orientalZodiacTenHeavenlySteamIndex(this.fiscal_year)] 
        },

        sexHash: function() {
            return {0:'女', 1:'男'}
        },
        nineStarNameHash: function() {
            return {1: '一白', 2: '二黒', 3: '三碧', 4: '四緑', 5: '五黄', 6: '六白', 7: '七赤', 8: '八白', 9: '九紫'}
        },
        baguaNameHash: function() {
            return {1: '乾', 2: '兌', 3: '離', 4: '震', 5: '巽', 6: '坎', 7: '艮', 8: '坤'}
        },
        natureNameHash: function() {
            return {1: '天', 2: '沢', 3: '火', 4: '雷', 5: '風', 6: '水', 7: '山', 8: '地'}
        },
        yinYangArrays: function() {
            return [[true, true, true], [false, true, true], [true, false, true], [false, false, true], [true, true, false], [false, true, false], [true, false, false], [false, false, false]];
        },
        yinYangNameSaffixArrays: function() {
            return [['天', '履', '同人', '无妄', '姤', '訟', '遯', '否'], 
                    ['夬', '沢', '革', '随', '大過', '困', '咸', '萃'], 
                    ['大有', '睽', '火', '噬盍', '鼎', '未済', '旅', '晋'], 
                    ['大壮', '帰妹', '豊', '雷', '恒', '解', '小過', '豫'], 
                    ['小蓄', '中孚', '家人', '益', '風', '渙', '漸', '観'], 
                    ['需', '節', '既済', '屯', '井', '水', '蹇', '比'], 
                    ['大畜', '損', '賁', '頤', '蠱', '蒙', '山', '剥'], 
                    ['泰', '臨', '明夷', '復', '升', '師', '謙', '地']
                ];
        },
        orientalZodiacNameHash: function() {
            return {1: '子', 2: '丑', 3: '寅', 4: '卯', 5: '辰', 6: '巳', 7: '午', 8: '未', 9: '申', 10: '酉', 11: '戌', 12: '亥'}
        },
        tenHeavenlyStemHash: function() {
            return {1: '甲', 2: '乙', 3: '丙', 4: '丁', 5: '戊', 6: '己', 7: '庚', 8: '辛', 9: '壬', 10: '癸'}
        },
        nacchinNames: function() {
            let arr = [];
            arr = arr.concat(['海中金', '炉中火', '大森木', '路傍土', '釼鋒金', '山頭火']);
            arr = arr.concat(['澗下水', '城頭士', '白鑞金', '楊柳木', '泉中水', '屋上土']);
            arr = arr.concat(['霹靂火', '松柏木', '長流水', '沙中金', '山下火', '平地木']);
            arr = arr.concat(['壁上土', '金箔金', '覆燈火', '天河水', '大駅土', '釵釧金']);
            arr = arr.concat(['桑柘木', '大溪水', '沙中土', '天上火', '石榴木', '大海水']);
            return arr;
        },
        orientalZodiacTenHeavenlySteamNames: function() {
            let arr = [];
            arr = arr.concat(['牽牛', '猛虎', '狡兔', '寝龍', '巻蛇']);
            arr = arr.concat(['荷馬', '物言羊', '芸猿', '軍鶏', '愛犬', '荒猪']);
            arr = arr.concat(['寺鼠', '乳牛', '寝虎', '野兎', '出世竜', '王様蛇']);
            arr = arr.concat(['兵隊馬', '野羊', '大猿', '家鳥', '狂犬', '勇猪']);
            arr = arr.concat(['野鼠', '耕牛', '暴虎', '家兔', '上り竜', '怒り蛇']);
            arr = arr.concat(['種馬', '毛羊', '王猿', '水鳥', '猟犬', '遊猪']);
            arr = arr.concat(['木鼠', '水牛', '走虎', '月兔', '隠し竜', '寝蛇']);
            arr = arr.concat(['競馬', '白羊', '赤猿', '闘鳥', '野犬', '病猪']);
            arr = arr.concat(['家鼠', '牧牛', '母虎', '玉兎', '下り竜', '長蛇']);
            arr = arr.concat(['神馬', '病羊', '山猿', '野鳥', '猛犬', '家猪']);
            arr = arr.concat(['溝鼠', '牽牛', '猛虎', '狡兎', '寝竜', '巻蛇']);
            arr = arr.concat(['荷馬', '物言羊', '芸猿', '軍鳥', '愛犬', '荒猪']);
            arr = arr.concat(['寺鼠', '乳牛', '寝虎', '野兎', '出世竜', '王様蛇']);
            arr = arr.concat(['兵隊馬', '野羊', '大猿', '家鳥', '狂犬', '勇猪']);
            arr = arr.concat(['野鼠', '耕牛', '暴虎', '家兎', '上り竜', '怒り蛇']);
            arr = arr.concat(['種馬', '毛羊', '王猿', '水鳥', '猟犬', '遊猪']);
            arr = arr.concat(['木鼠', '水牛', '走虎', '月兎', '隠し竜', '寝蛇']);
            arr = arr.concat(['競馬', '白羊', '赤猿', '闘鳥', '野犬', '病猪']);
            arr = arr.concat(['家鼠', '牧牛', '母虎', '玉兎', '下り竜', '長蛇']);
            arr = arr.concat(['神馬', '病羊', '山猿', '野鳥', '猛犬', '家猪']);
            return arr;
        }
    },

    methods: {
        indexRangeHash: function (idx_from, idx_to) {
            let ret = {};
            for (let i = idx_from; i <= idx_to; i++) {
                ret[i] = i;
            }
            return ret;
        },

        nacchinName: function(fiscal_year) {
            return this.nacchinNames[(((fiscal_year - (fiscal_year % 2)) - 1804) / 2) % 30];
        },
        isHeadFamilyStar: function(oriental_zodiac_number, nine_star_year) {
            let arr = ['1_1', '2_9', '6_11', '7_10', '8_3'];
            let str = String(nine_star_year) + '_' + String(oriental_zodiac_number);
            console.log('str: ' + str)
            return 0 <= arr.indexOf(str)
        },
        orientalZodiacNumber: function(fiscal_year) {
            return (fiscal_year - 1780) % 12 + 1;
        },
        tenHeavenlyStemNumber: function(fiscal_year) {
            return (fiscal_year - 1804) % 10 + 1;
        },
        orientalZodiacTenHeavenlySteamIndex: function(fiscal_year) {
            return (fiscal_year - 1793) % 60;
        },

        fiscalYear: function(dt) {
            return dt.getMonth() <= 1 && dt.getDate() <= 3 ? dt.getFullYear() - 1 : dt.getFullYear();
        },
        fiscalMonth: function(dt) {
            let div_day = [6, 4, 6, 5, 6, 6, 7, 8, 8, 9, 8, 8][dt.getMonth()];
            let ret = dt.getDate() < div_day ? dt.getMonth() : dt.getMonth() + 1;
            return ret == 0 ? 9 : ret;
        },
        nineStarYear: function(fiscal_year) {
            let tmp_year = (fiscal_year - 1802) % 9;
            return 9 - Math.abs(tmp_year) ;
        },
        nineStarMonth: function(nine_star_year, fiscal_month) {
            let base_fiscal_month = fiscal_month == 1 ? 13 : fiscal_month;
            let base_val = [10, 4, 7, 10, 4, 7, 10, 4, 7][nine_star_year - 1];
            let val = base_val - base_fiscal_month;
            while (val <= 0) {
                val = val + 9;
            }
            return val;
        },
        nineStarKiMonth: function(nine_star_year, nine_star_month, sex) {
            if(nine_star_year != nine_star_month) {
                return nine_star_month;
            }
            if(nine_star_month == 5) {
                return sex == 0 ? 6 : 7;
            }
            return [null, 9, 6, 4, 3, null, 2, 8, 7, 1][nine_star_month];
        },
        nineStarSlope: function(nine_star_year, nine_star_month, sex) {
            if(nine_star_year == 5 && nine_star_month == 5) {
                return [4, 3][sex];
            }
            let primary_nine_star = nine_star_year <= 5 ? nine_star_year + 4 : nine_star_year - 5;
            let ret = primary_nine_star - (nine_star_month - 1);
            return ret > 0 ? ret : ret + 9;
        },
        nineStarDokai: function(nine_star_year, nine_star_month, sex) {
            if(nine_star_year == 5 && nine_star_month == 5) {
                return [4, 3][sex];
            }
            if(nine_star_year == nine_star_month) {
                return [2, 7, 2, 5, 3, 1, 6, 9, 8][nine_star_year - 1];
            }
            // 1白の同会星 //
            let primary_nine_star = [1, 3, 5, 7, 9, 2, 4, 6, 8][nine_star_year - 1]
            let ret = primary_nine_star - (nine_star_month - 1);
            return ret <= 0 ? 9 + ret : ret;
        },
        nineStarMaxLuckDirection: function(nine_star_year, nine_star_month) {
            const gogyo_arr = [[9], [2, 5, 8], [6, 7], [1], [3, 4]];
            gogyo_arr.someIndex = function(nine_star) {
                let ret;
                this.forEach((arr, idx, all) => {
                    if(arr.includes(nine_star)) {
                        ret = idx;
                    }
                });
                return ret;
            };
            gogyo_arr.nextIndex = function(gogyo_index) {
                return gogyo_index == 4 ? 0 : gogyo_index + 1;
            };
            gogyo_arr.prevIndex = function(gogyo_index) {
                return gogyo_index == 0 ? 4 :gogyo_index - 1;
            };
            gogyo_arr.isNearIndex = function(year_gogyo_index, month_gogyo_index) {
                return year_gogyo_index == this.nextIndex(month_gogyo_index) || year_gogyo_index == this.prevIndex(month_gogyo_index);
            };
            gogyo_arr.maxLuckDirection = function(nine_star_year, nine_star_month) {
                let year_gogyo_index = this.someIndex(nine_star_year);
                let month_gogyo_index = this.someIndex(nine_star_month);

                let index_arr = [];
                if(year_gogyo_index == month_gogyo_index) {
                    index_arr = [this.prevIndex(year_gogyo_index), this.nextIndex(year_gogyo_index), year_gogyo_index];
                } 
                else if (this.isNearIndex(year_gogyo_index, month_gogyo_index)) {
                    index_arr = [year_gogyo_index, month_gogyo_index];
                } 
                else if (this.nextIndex(year_gogyo_index) == this.prevIndex(month_gogyo_index)) {
                    index_arr = [this.nextIndex(year_gogyo_index)];
                } 
                else if (this.nextIndex(month_gogyo_index) == this.prevIndex(year_gogyo_index)) {
                    index_arr = [this.nextIndex(month_gogyo_index)];
                }

                let ret = [];
                index_arr.forEach(function(idx) {
                    ret = ret.concat(gogyo_arr[idx]);
                });
                for(i = ret.length; i >= 0; i--) {
                    if (ret[i] == nine_star_year || ret[i] == nine_star_month || ret[i] == 5) {
                        ret.splice(i, 1);
                    }
                }
                return ret;
            };
            return gogyo_arr.maxLuckDirection(nine_star_year, nine_star_month);
        },

        nineStarToBaguaNumber: function (nine_star, sex) {
            if(nine_star == 5) {
                return sex == 0 ? 8 : 7;
            }
            return [6, 8, 4, 5, 0, 1, 2, 7, 3][nine_star - 1];
        },
        yinYangName: function (number_arr) {
            let upper_num = number_arr[0];
            let lower_num = number_arr[1];
            if(upper_num == lower_num) {
                return this.baguaNameHash[lower_num] + '為' + this.natureNameHash[upper_num];
            }
            return this.natureNameHash[upper_num] + this.natureNameHash[lower_num] + this.yinYangNameSaffixArrays[upper_num - 1][lower_num - 1];
        },
        rikaYinYangArray: function (number_arr) {
            let yin_yang_arrays = this.yinYangArrays;
            return number_arr.map(function(num) {
                let arr_str = yin_yang_arrays[num - 1].map(x => ! x).toString();
                return yin_yang_arrays.findIndex(x => x.toString() == arr_str) + 1;
            });
        },
        hinkaYinYangArray: function(number_arr) {
            let yin_yang_arrays = this.yinYangArrays;
            return number_arr.concat().reverse().map(function(num) {
                let arr_str = yin_yang_arrays[num - 1].concat().reverse().toString();
                return yin_yang_arrays.findIndex(x => x.toString() == arr_str) + 1;
            });
        },
        gokaYinYangArray: function(number_arr) {
            let yin_yang_arrays = this.yinYangArrays;
            let arr = yin_yang_arrays[number_arr[0] - 1].concat(yin_yang_arrays[number_arr[1] - 1]);
            return [[arr[2], arr[3], arr[4]], [arr[1], arr[2], arr[3]]].map(function(a) {
                return yin_yang_arrays.findIndex(x => x.toString() == a.toString()) + 1;
            });
        }
    }
});
