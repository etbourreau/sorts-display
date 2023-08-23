const wait = async (ms) => {
    return new Promise((r) => setTimeout(r, ms));
};
const swap = (arr, i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
};

Vue.createApp({
    data() {
        const CONFIG = {
            MAX: Math.floor(Math.random() * 100 + 100),
            RENDER_DELAY: 10,
        };
        const baseArray = this.getShuffledData(CONFIG.MAX);
        return {
            renderKey: 0,
            CONFIG,
            baseArray,
            sorts: this.getSorts(baseArray),
            sorting: false,
            done: false,
            runAmount: 0,
            autoRun: false,
            batchRun: false,
        };
    },
    methods: {
        getShuffledData: (length) => {
            return new Array(length)
                .fill()
                .map((v, i) => i + 1)
                .sort(() => 0.5 - Math.random());
        },
        getSorts: function (data) {
            const sorts = [
                {
                    name: "Bubble Sort",
                },
                {
                    name: "Merge Sort",
                },
                {
                    name: "Insertion Sort",
                },
                {
                    name: "Quick Sort",
                },
                {
                    name: "Selection Sort",
                },
                {
                    name: "Heap Sort",
                },
                {
                    name: "Radix Sort",
                },
                {
                    name: "Shell Sort",
                },
                {
                    name: "Counting Sort",
                },
                {
                    name: "Comb Sort",
                },
                {
                    name: "Cycle Sort",
                },
                {
                    name: "Tim Sort",
                },
            ];
            sorts.forEach((s) => {
                s.data = [...data];
                s.dataView = [...data];
                s.start = null;
                s.end = null;
                s.history = [];
            });
            const getData = (index, isView) => {
                return sorts[index][isView ? "dataView" : "data"];
            };
            const setData = (index, isView, data) => {
                return (sorts[index][isView ? "dataView" : "data"] = data);
            };
            // BUBBLE SORT
            sorts[0].fn = (isView = false) => {
                if (!isView) sorts[0].start = new Date().getTime();
                return new Promise(async (r) => {
                    const data = getData(0, isView);
                    for (let i = 0; i < data.length; i++) {
                        for (let j = 0; j < data.length - i - 1; j++) {
                            if (data[j] > data[j + 1]) {
                                const temp = data[j];
                                data[j] = data[j + 1];
                                data[j + 1] = temp;
                            }
                        }
                        if (isView) {
                            this.renderKey++;
                            await wait(this.CONFIG.DELAY);
                        }
                    }
                    if (!isView) {
                        sorts[0].end = new Date().getTime();
                        sorts[0].history.push(sorts[0].end - sorts[0].start);
                    }
                    r();
                });
            };
            // MERGE SORT
            sorts[1].fn = (isView = false) => {
                if (!isView) sorts[1].start = new Date().getTime();
                return new Promise(async (r) => {
                    const data = getData(1, isView);
                    let sortFn, mergeFn;
                    mergeFn = async (s1, e1, s2, e2) => {
                        const results = [];
                        let i1 = s1,
                            i2 = s2;
                        while (i1 <= e1 && i2 <= e2) {
                            if (data[i1] < data[i2]) {
                                results.push(data[i1]);
                                i1++;
                            } else {
                                results.push(data[i2]);
                                i2++;
                            }
                        }
                        while (i1 <= e1) {
                            results.push(data[i1]);
                            i1++;
                        }
                        while (i2 <= e2) {
                            results.push(data[i2]);
                            i2++;
                        }
                        for (let i = 0; i < results.length; i++) {
                            data[s1 + i] = results[i];
                            if (isView && i % 2 === 0) {
                                this.renderKey++;
                                await wait(this.CONFIG.DELAY);
                            }
                        }
                    };
                    sortFn = async (startIndex, endIndex) => {
                        return new Promise(async (r2) => {
                            if (endIndex - startIndex > 0) {
                                let s1 = startIndex,
                                    e1 =
                                        startIndex +
                                        Math.floor((endIndex - startIndex) / 2),
                                    s2 =
                                        startIndex +
                                        Math.ceil((endIndex - startIndex) / 2),
                                    e2 = endIndex;
                                s2 = s2 === e1 && s2 < e2 ? s2 + 1 : s2;
                                await Promise.all([
                                    sortFn(s1, e1),
                                    sortFn(s2, e2),
                                ]);
                                await mergeFn(s1, e1, s2, e2);
                            }
                            r2();
                        });
                    };
                    await sortFn(0, data.length - 1);
                    if (!isView) {
                        sorts[1].end = new Date().getTime();
                        sorts[1].history.push(sorts[1].end - sorts[1].start);
                    }
                    r();
                });
            };
            // INSERTION SORT
            sorts[2].fn = (isView = false) => {
                if (!isView) sorts[2].start = new Date().getTime();
                return new Promise(async (r) => {
                    const data = getData(2, isView);
                    for (let i = 1; i < data.length; i++) {
                        const v = data[i];
                        let j = i - 1;
                        while (j >= 0 && data[j] > v) {
                            data[j + 1] = data[j];
                            j--;
                        }
                        data[j + 1] = v;
                        if (isView) {
                            this.renderKey++;
                            await wait(this.CONFIG.DELAY);
                        }
                    }
                    if (!isView) {
                        sorts[2].end = new Date().getTime();
                        sorts[2].history.push(sorts[2].end - sorts[2].start);
                    }
                    r();
                });
            };
            // QUICK SORT
            sorts[3].fn = (isView = false) => {
                if (!isView) sorts[3].start = new Date().getTime();
                return new Promise(async (r) => {
                    const data = getData(3, isView);
                    const quickSort = async (startIndex, endIndex) => {
                        const pivot = Math.floor((startIndex + endIndex) / 2);
                        swap(data, pivot, endIndex);

                        let i = startIndex,
                            j = endIndex - 1;
                        while (i <= j) {
                            await Promise.all([
                                new Promise((r1) => {
                                    while (data[i] < data[endIndex]) {
                                        i++;
                                    }
                                    r1();
                                }),
                                new Promise((r1) => {
                                    while (data[j] > data[endIndex]) {
                                        j--;
                                    }
                                    r1();
                                }),
                            ]);
                            if (i < j) {
                                swap(data, i, j);
                                i++;
                                j--;
                            }
                        }
                        swap(data, i, endIndex);
                        if (isView) {
                            this.renderKey++;
                            await wait(this.CONFIG.DELAY * 4);
                        }
                        if (i - startIndex > 1) {
                            await quickSort(startIndex, i - 1);
                        }
                        if (endIndex - i > 1) {
                            await quickSort(i + 1, endIndex);
                        }
                    };
                    await quickSort(0, data.length - 1);
                    if (!isView) {
                        sorts[3].end = new Date().getTime();
                        sorts[3].history.push(sorts[3].end - sorts[3].start);
                    }
                    r();
                });
            };
            // SELECTION SORT
            sorts[4].fn = (isView = false) => {
                if (!isView) sorts[4].start = new Date().getTime();
                return new Promise(async (r) => {
                    const data = getData(4, isView);
                    for (let i = 0; i < data.length - 1; i++) {
                        let minIndex = i;
                        for (let j = i + 1; j < data.length; j++) {
                            if (data[j] < data[minIndex]) {
                                minIndex = j;
                            }
                        }
                        if (minIndex !== i) {
                            const temp = data[i];
                            data[i] = data[minIndex];
                            data[minIndex] = temp;
                        }
                        if (isView) {
                            this.renderKey++;
                            await wait(this.CONFIG.DELAY);
                        }
                    }
                    if (!isView) {
                        sorts[4].end = new Date().getTime();
                        sorts[4].history.push(sorts[4].end - sorts[4].start);
                    }
                    r();
                });
            };
            // HEAP SORT
            sorts[5].fn = (isView = false) => {
                if (!isView) sorts[5].start = new Date().getTime();
                return new Promise(async (r) => {
                    const data = getData(5, isView);
                    let length = data.length;
                    const heapify = async (i) => {
                        let max = i;
                        const left = 2 * i + 1;
                        const right = 2 * i + 2;
                        if (left < length && data[left] > data[max]) {
                            max = left;
                        }
                        if (right < length && data[right] > data[max]) {
                            max = right;
                        }
                        if (max !== i) {
                            swap(data, i, max);
                            await heapify(max);
                        }
                    };
                    for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
                        await heapify(i);
                    }
                    for (let i = length - 1; i > 0; i--) {
                        swap(data, 0, i);
                        length--;
                        if (isView) {
                            this.renderKey++;
                            await wait(this.CONFIG.DELAY);
                        }
                        await heapify(0);
                    }
                    if (!isView) {
                        sorts[5].end = new Date().getTime();
                        sorts[5].history.push(sorts[5].end - sorts[5].start);
                    }
                    r();
                });
            };
            // RADIX SORT
            sorts[6].fn = (isView = false) => {
                if (!isView) sorts[6].start = new Date().getTime();
                return new Promise(async (r) => {
                    let data = getData(6, isView);
                    const getDigit = (num, place) =>
                        (num + "")[(num + "").length - place - 1] || 0;
                    const digitCount = (num) => (num + "").length;
                    // using .sort, but not to sort elements LMFAO
                    const mostDigits = (arr) =>
                        arr.map((v) => digitCount(v)).sort((a, b) => b - a)[0];

                    let raw = [...data];
                    const length = raw.length;
                    let maxDigits = mostDigits(raw);
                    for (let k = 0; k < maxDigits; k++) {
                        let bucket = Array(10)
                            .fill()
                            .map(() => []);
                        for (let i = 0; i < length; i++) {
                            let digit = getDigit(raw[0], k);
                            bucket[digit].push(raw.splice(0, 1)[0]);
                            setData(6, isView, bucket.flat().concat(raw));
                            data = getData(6, isView);
                            if (isView && i % 2 === 0) {
                                this.renderKey++;
                                await wait(this.CONFIG.DELAY);
                            }
                        }
                        raw = bucket.flat();
                    }
                    if (!isView) {
                        sorts[6].end = new Date().getTime();
                        sorts[6].history.push(sorts[6].end - sorts[6].start);
                    }
                    r();
                });
            };
            // SHELL SORT
            sorts[7].fn = (isView = false) => {
                if (!isView) sorts[7].start = new Date().getTime();
                return new Promise(async (r) => {
                    const data = getData(7, isView);
                    let increment = Math.floor(data.length / 2);
                    while (increment > 0) {
                        for (let i = increment; i < data.length; i++) {
                            const v = data[i];
                            let j = i;
                            while (j >= increment && data[j - increment] > v) {
                                data[j] = data[j - increment];
                                j -= increment;
                            }
                            data[j] = v;
                            if (isView && i % 3 === 0) {
                                this.renderKey++;
                                await wait(this.CONFIG.DELAY);
                            }
                        }
                        if (increment == 2) {
                            increment = 1;
                        } else {
                            increment = Math.floor((increment * 5) / 11);
                        }
                    }
                    if (!isView) {
                        sorts[7].end = new Date().getTime();
                        sorts[7].history.push(sorts[7].end - sorts[7].start);
                    }
                    r();
                });
            };
            // COUNTING SORT
            sorts[8].fn = (isView = false) => {
                if (!isView) sorts[8].start = new Date().getTime();
                return new Promise(async (r) => {
                    let raw = [...getData(8, isView)];
                    const counts = {};
                    while (raw.length) {
                        counts[raw.splice(0, 1)[0]]++;
                        setData(
                            8,
                            isView,
                            Object.keys(counts)
                                .map((v) => +v)
                                .concat(raw)
                        );
                        if (isView) {
                            this.renderKey++;
                            await wait(this.CONFIG.DELAY);
                        }
                    }
                    if (!isView) {
                        sorts[8].end = new Date().getTime();
                        sorts[8].history.push(sorts[8].end - sorts[8].start);
                    }
                    r();
                });
            };
            // COMB SORT
            sorts[9].fn = (isView = false) => {
                if (!isView) sorts[9].start = new Date().getTime();
                return new Promise(async (r) => {
                    const data = getData(9, isView);

                    const shrink = 1.3;
                    let gap = data.length,
                        swapped = false;
                    while (gap > 1 || swapped) {
                        if (gap > 1) {
                            gap = Math.floor(gap / shrink);
                        }
                        swapped = false;
                        for (let i = 0; i + gap < data.length; i++) {
                            if (data[i] > data[i + gap]) {
                                swapped = true;
                                swap(data, i, i + gap);
                                if (isView) {
                                    this.renderKey++;
                                    await wait(this.CONFIG.DELAY);
                                }
                            }
                        }
                    }

                    if (!isView) {
                        sorts[9].end = new Date().getTime();
                        sorts[9].history.push(sorts[9].end - sorts[9].start);
                    }
                    r();
                });
            };
            // CYCLE SORT
            sorts[10].fn = (isView = false) => {
                if (!isView) sorts[10].start = new Date().getTime();
                return new Promise(async (r) => {
                    const data = getData(10, isView);

                    let cycleStart, position, value;
                    const searchPos = () => {
                        for (let i = cycleStart + 1; i < data.length; i++) {
                            if (data[i] < value) {
                                position++;
                            }
                        }
                    };
                    for (
                        cycleStart = 0;
                        cycleStart < data.length - 2;
                        cycleStart++
                    ) {
                        value = data[cycleStart];
                        position = cycleStart;

                        searchPos();
                        if (position == cycleStart) {
                            continue;
                        }
                        while (value === data[position]) {
                            position++;
                        }
                        if (position !== cycleStart) {
                            let tmp = data[position];
                            data[position] = value;
                            value = tmp;
                            if (isView) {
                                this.renderKey++;
                                await wait(this.CONFIG.DELAY);
                            }
                        }
                        while (position !== cycleStart) {
                            position = cycleStart;
                            searchPos();
                            while (value === data[position]) {
                                position++;
                            }
                            if (value !== data[position]) {
                                tmp = data[position];
                                data[position] = value;
                                value = tmp;
                                if (isView) {
                                    this.renderKey++;
                                    await wait(this.CONFIG.DELAY);
                                }
                            }
                        }
                    }
                    if (!isView) {
                        sorts[10].end = new Date().getTime();
                        sorts[10].history.push(sorts[10].end - sorts[10].start);
                    }
                    r();
                });
            };
            // TIM SORT
            sorts[11].fn = (isView = false) => {
                if (!isView) sorts[11].start = new Date().getTime();
                return new Promise(async (r) => {
                    let data = getData(11, isView);

                    const chunks = [[]];
                    let asc = data[0] < data[1];
                    for (let i = 0; i < data.length; i++) {
                        chunks[chunks.length - 1].push(data[i]);
                        if (data[i] !== undefined) {
                            if (
                                (asc && data[i + 1] <= data[i]) ||
                                (!asc && data[i + 1] >= data[i])
                            ) {
                                chunks.push([]);
                                asc =
                                    data[i + 2] === undefined
                                        ? asc
                                        : (asc && data[i + 2] <= data[i + 1]) ||
                                          (!asc && data[i + 2] >= data[i + 1])
                                        ? !asc
                                        : asc;
                            }
                        }
                    }
                    for (let i = 0; i < chunks.length; i++) {
                        if (
                            chunks[i].length > 1 &&
                            chunks[i][1] < chunks[i][0]
                        ) {
                            chunks[i] = chunks[i].reverse();
                            setData(11, isView, chunks.flat());
                            data = getData(11, isView);
                            if (isView) {
                                this.renderKey++;
                                await wait(this.CONFIG.DELAY);
                            }
                        }
                    }
                    const mergeFn = async (s1, e1, s2, e2) => {
                        let arrL = data.slice(s1, e1 + 1),
                            arrR = data.slice(s2, e2 + 1),
                            l = 0,
                            r = 0,
                            i = 0;
                        while (l < arrL.length && r < arrR.length) {
                            if (arrL[l] < arrR[r]) {
                                data.splice(s1 + i, 1, arrL[l]);
                                l++;
                            } else {
                                data.splice(s1 + i, 1, arrR[r]);
                                r++;
                            }
                            i++;
                        }
                        if (isView) {
                            this.renderKey++;
                            await wait(this.CONFIG.DELAY);
                        }
                        while (l < arrL.length) {
                            data.splice(s1 + i, 1, arrL[l]);
                            l++;
                            i++;
                        }
                        while (r < arrR.length) {
                            data.splice(s1 + i, 1, arrR[r]);
                            r++;
                            i++;
                        }
                        if (isView) {
                            this.renderKey++;
                            await wait(this.CONFIG.DELAY);
                        }
                    };
                    let elCount = 0;
                    for (let i = 0; i < chunks.length - 1; i++) {
                        await mergeFn(
                            0,
                            elCount + chunks[i].length - 1,
                            elCount + chunks[i].length,
                            elCount +
                                chunks[i].length +
                                chunks[i + 1].length -
                                1
                        );
                        elCount += chunks[i].length;
                    }
                    if (!isView) {
                        sorts[11].end = new Date().getTime();
                        sorts[11].history.push(sorts[11].end - sorts[11].start);
                    }
                    r();
                });
            };
            return sorts;
        },
        reset: function () {
            this.baseArray = this.getShuffledData(this.CONFIG.MAX);
            this.sorts.forEach((s) => {
                s.data = [...this.baseArray];
                s.dataView = [...this.baseArray];
                s.start = null;
                s.end = null;
            });
            this.sorting = false;
            this.done = false;
        },
        startSorting: async function () {
            this.sorting = true;
            if (this.sorting) {
                for (let i = 0; i < this.sorts.length; i++) {
                    if (this.sorts[i].fn) {
                        await this.sorts[i].fn();
                        if (this.batchRun) {
                            this.renderKey++;
                            await wait(this.CONFIG.DELAY);
                            this.sorts[i].dataView = [...this.sorts[i].data];
                        } else {
                            await this.sorts[i].fn(true);
                        }
                    }
                }
                this.sorting = false;
                this.done = true;
                this.runAmount++;
                if (this.autoRun) {
                    this.reset();
                    this.startSorting();
                }
            }
        },
        getAvgTime: (sort) => {
            if (sort?.history?.length) {
                return (
                    "avg. " +
                    Math.round(
                        (sort.history.reduce((a, b) => a + b) /
                            sort.history.length) *
                            100
                    ) /
                        100 +
                    "ms"
                );
            } else {
                throw new Error("Can't get average time for never ran sort");
            }
        },
    },
    template: `
        <div class="sorts-wrapper d-flex flex-wrap align-items-start">
            <div v-for="s in sorts" :key="s.name" class="col-4 col-md-3 sort d-flex flex-column">
                <div class="w-100 flex-grow-1 d-flex flex-nowrap align-items-end">
                    <div v-for="(v,i) in batchRun ? s.data : s.dataView" :key="renderKey+i" class="bar" :style="{
                        width: Math.round(100 / s.data.length) + '%',
                        height: (v / CONFIG.MAX * 100) + '%',
                    }"></div>
                </div>
                <div class="w-100 title d-flex justify-content-center align-items-center text-center">
                    {{ s.name }}
                    {{
                        s.start && s.end ? ("("+(s.end-s.start)+"ms"+
                        (s.history?.length > 1 ? ", " + getAvgTime(s) : '')+
                        ")") : ""
                    }}
                </div>
            </div>
        </div>
        <div class="run-counter" v-show="runAmount > 0">{{runAmount}}</div>
        <div class="ui-banner">
            <button v-if="!sorting" class="btn-warning"
                @click="reset()">Randomize</button>
            <button v-if="!sorting" class="btn-success"
                @click="startSorting()"
                :disabled="done">Sort</button>
            <div class="d-flex flex-column config">
                <div class="w-fit-content" title="Randomize and start sorting when sorting ends">
                    <input type="checkbox" id="auto-run" v-model="autoRun" />
                    <label for="auto-run">Auto-run</label>
                </div>
                <div class="w-fit-content" title="Disable sorting display (only process in background)">
                    <input type="checkbox" id="batch-run" v-model="batchRun" :disabled="sorting" />
                    <label for="batch-run">Batch-run</label>
                </div>
            </div>
            <button v-if="!sorting" class="btn-danger"
                @click="sorts[11].fn(true)">debug</button>
        </div>
    `,
}).mount("#app");
