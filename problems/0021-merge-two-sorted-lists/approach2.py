# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution(object):
    def mergeTwoLists(self, list1, list2):
        if not list1:  # one list is empty: the answer is the other one  # @viz base
            return list2  # @viz base
        if not list2:  # @viz base
            return list1  # @viz base
        if list1.val <= list2.val:  # the smaller head goes first (list1 on a tie)  # @viz pick
            list1.next = self.mergeTwoLists(list1.next, list2)  # @viz left
            return list1  # @viz left
        list2.next = self.mergeTwoLists(list1, list2.next)  # @viz right
        return list2  # @viz right
