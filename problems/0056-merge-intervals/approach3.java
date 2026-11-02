import java.util.ArrayList;
import java.util.List;
class Solution {
    public int[][] merge(int[][] intervals) {
        int top = 0; // @viz init
        for (int[] in : intervals) top = Math.max(top, in[1]); // @viz init
        int[] starts = new int[top + 1]; // starts[x]: how many intervals begin at x // @viz init
        int[] ends = new int[top + 1]; // ends[x]: how many intervals finish at x // @viz init
        for (int[] in : intervals) { // @viz count
            starts[in[0]]++; // @viz count
            ends[in[1]]++; // @viz count
        }
        List<int[]> merged = new ArrayList<>(); // @viz prep
        int active = 0, begin = 0; // active: intervals open right now // @viz prep
        for (int x = 0; x <= top; x++) { // sweep left to right // @viz sweep
            if (active == 0 && starts[x] > 0) begin = x; // nothing was open: a merged interval begins here // @viz begin
            active += starts[x]; // count every start and end at x before checking for a close // @viz sweep
            active -= ends[x]; // @viz sweep
            if (active == 0 && ends[x] > 0) merged.add(new int[] {begin, x}); // the last open interval just closed // @viz close
        }
        return merged.toArray(new int[0][]); // @viz return
    }
}
