class Solution(object):
    def findMedianSortedArrays(self, nums1, nums2):
        nums1_len = len(nums1)
        nums2_len = len(nums2)
        i = 0
        j = 0
        if nums1_len + nums2_len == 1:
            return nums1[0] if nums1_len else nums2[0]
        elif nums1_len + nums2_len == 0:
            return 0

        result = list()
        while i < nums1_len or j < nums2_len:
            if i < nums1_len and j < nums2_len:
                if nums1[i] < nums2[j]:
                    result.append(nums1[i])
                    i += 1
                elif nums1[i] == nums2[j]:
                    result.append(nums1[i])
                    result.append(nums2[j])
                    i += 1
                    j += 1
                else:
                    result.append(nums2[j])
                    j += 1
            else:
                if i < nums1_len:
                    result.extend(nums1[i:])
                else:
                    result.extend(nums2[j:])
                break

        result_len = len(result)
        mid = result_len // 2
        if result_len % 2 == 0:
            return (result[mid - 1] + result[mid]) / 2.0
        else:
            return float(result[mid])
