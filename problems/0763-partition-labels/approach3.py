class Solution(object):
    def partitionLabels(self, s):
        last = {ch: i for i, ch in enumerate(s)}  # each letter's last index (later ones overwrite)  # @viz last
        res = []  # @viz init
        start = end = 0  # @viz init
        for i, ch in enumerate(s):  # @viz scan
            end = max(end, last[ch])  # this part must reach at least ch's last copy  # @viz scan
            if i == end:  # every letter so far ends here: cut  # @viz cut
                res.append(end - start + 1)  # @viz cut
                start = i + 1  # @viz cut
        return res  # @viz return
