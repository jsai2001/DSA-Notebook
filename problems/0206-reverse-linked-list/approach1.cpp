/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
#include <vector>
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        std::vector<int> vals; // @viz copy
        for (ListNode* node = head; node; node = node->next) vals.push_back(node->val); // copy the values out, front to back // @viz copy
        for (ListNode* node = head; node; node = node->next) { // write them back, back to front // @viz write
            node->val = vals.back(); // @viz write
            vals.pop_back(); // @viz write
        }
        return head; // same nodes, values in reverse order // @viz return
    }
};
