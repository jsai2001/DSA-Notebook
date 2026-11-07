class Solution(object):
    def partitionLabels(self, s):
        res = []  # @viz init
        start = 0  # @viz init
        while start < len(s):  # build one part at a time  # @viz part
            end = s.rindex(s[start])  # the part must reach this letter's last copy  # @viz part
            j = start  # @viz grow
            while j <= end:  # every letter inside pushes the end to its own last copy  # @viz grow
                end = max(end, s.rindex(s[j]))  # rindex scans from the back: O(n) each time  # @viz grow
                j += 1  # @viz grow
            res.append(end - start + 1)  # @viz cut
            start = end + 1  # @viz cut
        return res  # @viz return
